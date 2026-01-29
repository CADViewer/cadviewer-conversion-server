const fs = require("fs");
const { generateGroqResponse } = require("./libs/ai/groqService");
const {
  generateGoogleAiStudioResponse,
} = require("./libs/ai/googleAiStudioService");
const { generateLmStudioResponse } = require("./libs/ai/lmStudioService");

const data = [
  {
    caption: "Tenant Information (ABERCROMBIE & FITCH)",
    detail: {
      "Mall Name": "Victoria Gardens",
      "Property #": "3204",
      DBA: "ABERCROMBIE & FITCH",
      "Space #": "5035",
      GLA: "8,339",
      "Actual Footprint SF": "8,339",
      BMR: "$379,654.60",
      "BMR PSF": "$45.53",
      "Total Rent": "$465,777.16",
      "Total Rent PSF": "$55.86",
      "Sales R12": "$5,306,269.27",
      "Sales R12 PSF": "$636.32",
      "Occupancy Cost": "8.44%",
      "Occupancy Cost PSF": "$53.68",
      "Deal Type": "RNL",
      "Lease ID": "518224-1",
      "Lease Type": "Retail",
      "Lease Status": "Open",
      "Deal ID": "S0771958",
      "Deal Stage": "Executed",
      "Deal Record Type": "Permanent",
      "Lease Start Date": "03/01/2023",
      "Lease End Date": "02/29/2028",
      "Rent Expiration Date": "02/29/2028",
      "ABF RCD": "03/01/2023",
      "Date of Possession (Mutually Agreed)": "03/01/2023",
      "Date of Possession (Projected Per TC)": "03/01/2023",
      "Store Opening (Projected Per TC)": "07/01/2023",
      "Executed Date": "06/09/2022",
      "Kickout Y/N (within 24 months)": "No",
      "Merchandise Category": "195 - Teen Apparel",
    },
  },
  {
    caption: "Future Tenant Information (A******************)",
    detail: {
      "Mall Name": "Victoria Gardens",
      "Property #": "3204",
      DBA: "A******************",
      "Space #": "5035",
      "SF of the Deal": "8,339",
      "Total Rent": "$500,986.75",
      "Total Rent PSF": "$60.08",
      "Projected R12 Sales": "$5,306,269.27",
      "Projected R12 Sales PSF": "$636.32",
      "Occupancy Cost %": "12.00%",
      "Occupancy Cost PSF": "$60.08",
      "Deal ID": "S0908100",
      "Deal Name": "A************************************************",
      "Deal Type": "Renewal / Ancillary Doc",
      "Deal Stage": "Signed, Fixed Rent Commence",
      "Deal Record Type": "Permanent",
      "Projected Rent Commencement Date": "03/01/2028",
      "ABF RCD": "03/01/2028",
      "Term (Months)": "23",
      "Rent Expiration Date": "02/28/2030",
      "Deal Rent Type": "Modified Gross",
      "Merchandise Category": "Teen Apparel",
      "Lease ID": "518224-2",
      "Lease Type": "Retail",
      "Lease Status": "Signed, Fixed Rent Commence",
      "% to Pay": "6.00%",
      "Date of Possession (Mutually Agreed)": "03/01/2028",
      "Date of Possession (Projected Per TC)": "03/01/2028",
      "Store Opening (Projected Per TC)": "03/01/2028",
    },
  },
];

class DataSearchEngine {
  constructor(data) {
    this.data = data;
  }

  // Fonction principale de recherche
  search(searchCriteria) {
    if (
      !searchCriteria.searchCriteria ||
      searchCriteria.searchCriteria.length === 0
    ) {
      return this.data;
    }

    return this.data.filter((item) => {
      const results = searchCriteria.searchCriteria.map((criteria) =>
        this.applyCriteria(item, criteria)
      );

      // Applique la logique AND/OR
      return searchCriteria.logic === "OR"
        ? results.some((r) => r)
        : results.every((r) => r);
    });
  }

  // Applique un critère de recherche à un item
  applyCriteria(item, criteria) {
    // Gestion spéciale pour la proximité
    if (criteria.operator === "PROXIMITY") {
      return this.applyProximityCriteria(item, criteria);
    }

    const value = this.getNestedValue(item, criteria.field);
    if (value === undefined || value === null) return false;

    const stringValue = String(value).toLowerCase();
    const searchValue = String(criteria.value).toLowerCase();

    switch (criteria.operator) {
      case "ILIKE":
        return stringValue.includes(searchValue);

      case "LIKE":
        return String(value).includes(String(criteria.value));

      case "EQUAL":
        return stringValue === searchValue;

      case "LOWER_THAN":
        return this.parseNumeric(value) < this.parseNumeric(criteria.value);

      case "UPPER_THAN":
        return this.parseNumeric(value) > this.parseNumeric(criteria.value);

      case "BETWEEN":
        const numValue = this.parseNumeric(value);
        const min = this.parseNumeric(criteria.value);
        const max = this.parseNumeric(criteria.value2);
        return numValue >= min && numValue <= max;

      case "IN":
        const values = Array.isArray(criteria.value)
          ? criteria.value
          : [criteria.value];
        return values.some((v) => stringValue === String(v).toLowerCase());

      default:
        return false;
    }
  }

  // Applique un critère de proximité
  applyProximityCriteria(item, criteria) {
    const { referenceEntity, referenceField, distance, distanceUnit } =
      criteria;

    // Trouve les entités de référence dans le dataset
    const referenceEntities = this.data.filter((refItem) => {
      const refValue = this.getNestedValue(refItem, referenceField);
      if (!refValue) return false;

      return String(refValue)
        .toLowerCase()
        .includes(String(referenceEntity).toLowerCase());
    });

    if (referenceEntities.length === 0) {
      console.log(
        `⚠️ Reference entity "${referenceEntity}" not found in dataset`
      );
      return false;
    }

    // Pour cette implémentation simple, on considère que les entités
    // dans le même centre commercial sont "proches"
    const itemMall = this.getNestedValue(item, "Mall Name");

    return referenceEntities.some((refEntity) => {
      const refMall = this.getNestedValue(refEntity, "Mall Name");

      // Même centre commercial = proximité
      if (itemMall && refMall && itemMall === refMall) {
        return true;
      }

      // TODO: Implémenter la vraie logique de distance géographique
      // si vous avez des coordonnées géographiques dans vos données

      return false;
    });
  }

  // Récupère une valeur imbriquée dans l'objet
  getNestedValue(obj, path) {
    // Cherche d'abord dans detail si existe
    if (obj.detail && obj.detail[path] !== undefined) {
      return obj.detail[path];
    }

    // Puis dans l'objet principal
    if (obj[path] !== undefined) {
      return obj[path];
    }

    // Cherche dans tous les sous-objets
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const nested = this.getNestedValue(obj[key], path);
        if (nested !== undefined) return nested;
      }
    }

    return undefined;
  }

  // Parse les valeurs numériques (gère $, %, virgules)
  parseNumeric(value) {
    if (typeof value === "number") return value;

    const stringValue = String(value);
    // Supprime $, %, virgules et espaces
    const cleaned = stringValue.replace(/[$,%\s]/g, "");
    const parsed = parseFloat(cleaned);

    return isNaN(parsed) ? 0 : parsed;
  }

  // Génère automatiquement la liste des champs disponibles
  getAvailableFields() {
    const fields = new Set();

    const extractFields = (obj, prefix = "") => {
      for (const key in obj) {
        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          extractFields(obj[key], prefix ? `${prefix}.${key}` : key);
        } else {
          fields.add(prefix ? `${prefix}.${key}` : key);
        }
      }
    };

    this.data.forEach((item) => extractFields(item));
    return Array.from(fields).sort();
  }
}

const searchEngine = new DataSearchEngine(data);
const availableFields = searchEngine.getAvailableFields();
console.log(availableFields);

const configData = fs.readFileSync("CADViewer_config.json", "utf-8");
config = JSON.parse(configData);

let systemPrompt = fs.readFileSync("./libs/ai/new_system_prompt.md", "utf-8");

systemPrompt = systemPrompt.replace(
  "{AVAILABLE_FIELDS}",
  availableFields.join(", ")
);

const userPrompt = "Show me Abercrombie stores in Victoria Gardens";

const aiSystem = "openai"; // Groq or Gemini or openai
// Groq
const apiKeyGroq = config.GROQ_API_KEY;
const modelGroq = config.GROQ_MODEL;
if (!apiKeyGroq || !modelGroq) {
  throw new Error("Groq API Key or Model is missing in configuration.");
}

// Google AI Studio
const apiKeyGemini = config.GOOGLE_AI_API_KEY;
const modelGemini = config.GOOGLE_AI_MODEL;
if (!apiKeyGemini || !modelGemini) {
  throw new Error("Google AI API Key or Model is missing in configuration.");
}

// OpenAI
const apiKeyOpenAI = config.OPENAI_API_KEY;
const modelOpenAI = config.OPENAI_MODEL;
const urlOpenAI = config.OPENAI_API_URL;
if (!apiKeyOpenAI || !modelOpenAI) {
  throw new Error("OpenAI API Key or Model is missing in configuration.");
}

console.log(
  `Using ${aiSystem} service with model: ${
    aiSystem === "Groq" ? modelGroq : modelGemini
  }`
);

const messages = [
  {
    role: "system",
    content: systemPrompt,
  },
  {
    role: "user",
    content: userPrompt,
  },
];

(aiSystem === "Groq"
  ? generateGroqResponse(apiKeyGroq, modelGroq, messages, 8192)
  : aiSystem === "Gemini"
  ? generateGoogleAiStudioResponse(apiKeyGemini, modelGemini, messages, 8192)
  : generateLmStudioResponse(urlOpenAI, modelOpenAI, messages, 8192)
)
  .then((searchConfig) => {
    console.log("Response from AI:", searchConfig);

    try {
      // Parse the JSON response

      if (searchConfig.success) {
        console.log("\n✅ Query successfully analyzed:");
        console.log("🤖 IA:", searchConfig.message);
        console.log(
          "Search Criteria:",
          JSON.stringify(searchConfig.searchCriteria, null, 2)
        );
        console.log("Logic:", searchConfig.logic);
        console.log("Confidence:", searchConfig.confidence);

        if (searchConfig.limitations) {
          console.log("⚠️ Limitations:", searchConfig.limitations);
        }

        // Execute the search with the generated criteria
        console.log("\n🔍 Executing search...");
        const results = searchEngine.search(searchConfig);
        console.log(`Found ${results.length} results:`);

        results.forEach((result, index) => {
          console.log(`\n--- Result ${index + 1} ---`);
          console.log("Caption:", result.caption);
          if (result.detail) {
            console.log("DBA:", result.detail.DBA);
            console.log("Mall:", result.detail["Mall Name"]);
            console.log("GLA:", result.detail.GLA);
            console.log("Total Rent PSF:", result.detail["Total Rent PSF"]);
            console.log(
              "Rent Expiration:",
              result.detail["Rent Expiration Date"]
            );

            // Affichage des informations de proximité si applicable
            const proximitySearch = searchConfig.searchCriteria.find(
              (c) => c.operator === "PROXIMITY"
            );
            if (proximitySearch) {
              console.log(
                `📍 Proximité: Dans le même centre que ${proximitySearch.referenceEntity}`
              );
            }
          }
        });
      } else {
        console.log("\n❌ Query could not be understood:");
        console.log("🤖 IA:", searchConfig.message);
        console.log("Error:", searchConfig.error);
        if (searchConfig.details) {
          console.log("Details:", searchConfig.details);
        }

        if (searchConfig.suggestions) {
          console.log("\n💡 Suggestions:");
          searchConfig.suggestions.forEach((suggestion, index) => {
            console.log(`${index + 1}. ${suggestion}`);
          });
        }
      }
    } catch (error) {
      console.error("❌ Failed to parse AI response as JSON:", error);
      console.log("Raw response:", res);
    }
  })
  .catch((error) => {
    console.error("❌ Error calling AI service:", error);
  });
