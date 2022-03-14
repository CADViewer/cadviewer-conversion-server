    languages: [
    , {
            languageCode: "KO-KR",
            thisLanguage: "Korean",

            PrintModal: {
                Header: 'CADViewer JS &#52636;&#47141; &#49444;&#51221;', // '출력 설정', // 'CADViewer JS Print Settings',
                Paper: 'CADViewer JS &#52636;&#47141; &#49444;&#51221;',     '출력 설정', // 'CADViewer JS Print Settings',
                Orientation: '&#50857;&#51648; &#48169;&#54693;:',// '용지 방향:', // 'Orientation:',
                Resolution: '&#54644;&#49345;&#46020;:','해상도:', // 'Resolution:',
                ResolutionText: '(&#52572;&#49548; 75dpi, &#44592;&#48376; 300dpi)', //'(최소 75dpi, 기본 300dpi)', // '(min 75dpi, standard 300dpi)',
                Print: '&#52636;&#47141;',// '출력', // 'Print',
                Grayscale: '&#55121;&#48177;',// '흑백', // 'Grayscale',
                PrintPDF: 'PDF&#47196; &#52636;&#47141;',//'PDF로 출력' // 'Print as PDF'
            },

            SearchTextModal: {
                Header: '문자열 검색', // 'Search Text',
                SearchText: '조회 문자열:', // 'Search Text:',
                Zoom: '줌 레벨:', // 'Zoom Level:',
                Search: '조회' // 'Search'
            },

            InfoMessageModal: {
                Header: 'Information', // 'Information',
                Version: 'This version number is: ', // 'This version number is: ',
                ComingSoon: 'Coming Soon!', // 'Coming Soon!',
                NoUnits: 'No units defined in drawing, please use command Calibrate Measurement first.', // 'No units defined in drawing, please use command Calibrate Measurement first.',
                UnitLess: 'The originating drawing is unitless, please use command Calibrate Measurement first.', // 'The originating drawing is unitless, please use command Calibrate Measurement first.',
                QuickCountSingle: 'Number of Quick Counts is: ', // 'Number of Quick Counts is: ',
                QuickCountMultiple: 'Number of Quick Counts are: ', // 'Number of Quick Counts are: ',
                RedlinesLocked: 'Redlines are locked for User: ', // 'Redlines are locked for User: ',
                LicensePath: 'Could not find license key at path: ', // 'Could not find license key at path: ',
                LicenseNotFound: 'License key not found', // 'License key not found',
                SelectTwoPoints: 'Please select two points in the drawing with the mouse first, then enter unit and distance, finally press OK.', // 'Please select two points in the drawing with the mouse first, then enter unit and distance, finally press OK.',
                ReferenceDistance: 'Please enter a reference distance.', // ReferenceDistance: 'Please enter a reference distance.',
                RedlinesSaved: 'Redlines Saved', // 'Redlines Saved',
                SinglePage: 'Single page drawing - no change of page', // : 'Single page drawing - no change of page',
                FirstPage: 'The current page is the first page in a multipage drawing - no change of page', // 'The current page is the first page in a multipage drawing - no change of page',
                LastPage: 'The current page is the last page in a multipage drawing - no change of page', // 'The current page is the last page in a multipage drawing - no change of page',
                OutOfRange: 'The page number entered is outside of the range of pages - no change of page', // 'The page number entered is outside of the range of pages - no change of page',
                FileLoadThroughApp: 'NOTE: File Load enabled only through the encapsulating application', // 'NOTE: File Load enabled only through the encapsulating application',
                ErrorConnectingToHost: 'Error when connecting to Host. Go to the Settings Pane and check your Network Settings!', // 'Error when connecting to Host. Go to the Settings Pane and check your Network Settings!',
                ConnectToHostFirst: 'Please go to the Settings Pane, check your Network Settings and click Save Changes to connect to your Network Host to retrieve the data structure used when mapping locations.', // 'Please go to the Settings Pane, check your Network Settings and click Save Changes to connect to your Network Host to retrieve the data structure used when mapping locations.',
                NoObjectSelected: 'Please select a Space Object.', // 'Please select a Space Object.',
                PaperSizePDFPrintOnly: 'Please select "Print as PDF" for large paper sizes size. Large papersizes are A1 and A0, as well as US Arch D and above.', // 'Please select "Print as PDF" for large paper sizes size. Large papersizes are A1 and A0, as well as US Arch D and above.',
                ServerSideFormatForPDFPrint: 'PDF print requires an original file in formats DWG, DWF, DXF or DGN or PCF. Please upload a file in these formats or select a smaller papersize for direct print. Direct print papersizes are A4-A2 or US Letter through ANSI C', // 'PDF print requires an original file in formats DWG, DWF, DXF or DGN or PCF. Please upload a file in these formats or select a smaller papersize for direct print. Direct print papersizes are A4-A2 or US Letter through ANSI C',

            },

            FileLoadModal: {
                Header: 'CADViewer JS - File Manager', // 'CADViewer JS - File Manager',
                DrawingFilename: 'DRAWING / FILENAME', // 'DRAWING / FILENAME',
                EditFloorplanInfo: 'Edit Floor Plan Info', // 'Edit Floor Plan Info',
            },

            SaveRedlineModal: {
                Header: 'CADViewer JS - Save Redline', // 'CADViewer JS - Save Redline',
                RedlineFilename: 'REDLINE / FILENAME', // 'REDLINE / FILENAME',
                EditRedlineInfo: 'Edit Redline Info', // 'Edit Redline Info',
                Upload: 'UPLOAD:', // 'UPLOAD:',
            },

            OpenRedlineModal: {
                Header: 'CADViewer JS - Open Redline', // 'CADViewer JS - Open Redline',
                RedlineFilename: 'REDLINE / FILENAME', // 'REDLINE / FILENAME',
                EditRedlineInfo: 'Edit Redline Info', // 'Edit Redline Info',
            },

            RedlineThicknessModal: {
                Header: 'Select Redline Thickness', // 'Select Redline Thickness',
                Thickness: 'Thickness:', // 'Thickness:',
                OK: 'OK', // 'OK'
            },

            DocumentPageChangeModal: {
                Header: 'Select Document Page', // 'Select Document Page',
                Page: 'Page:', // 'Page:',
                OK: 'OK' // 'OK'
            },

            CollaborationStartModal: {
                Header: 'Enter Collaboration Session', // 'Enter Collaboration Session',
                Session: 'Session Name:', // 'Session Name:',
                OK: 'OK' // 'OK'
            },

            PublishPDFModal: {
                Header: 'Publish Redlined Screen Content to PDF', // 'Publish Redlined Screen Content to PDF',
                SelectMode: 'Select Mode:', // 'Select Mode:',
                Mode1: 'Print/Download', // 'Print/Download',
                Mode2: 'Send as e-mail', // 'Send as e-mail',
                Mode3: 'Upload to Server', // 'Upload to Server',
                EntireDoc: 'Publish Entire Document:', // 'Publish Entire Document:',
                OK: 'OK', // 'OK',
                Recipient: 'E-mail:', // 'E-mail:',
                Title: 'Title:', // 'Title:',
                Message: 'Message:', // 'Message:',
            },

            MergeDXFModal: {
                Header: 'Merge Redline with Source DWG', // 'Merge Redline with Source DWG',
                SelectMode: 'Select Mode:', // 'Select Mode:',
                Mode1: 'Download', // 'Download',
                Mode2: 'Send as e-mail', // 'Send as e-mail',
                Mode3: 'Upload to Server', // 'Upload to Server',
                EntireDoc: 'Publish Entire Document:', // 'Publish Entire Document:',
                OK: 'OK', // 'OK',
                Recipient: 'E-mail:', // 'E-mail:',
                Title: 'Title:', // 'Title:',
                Message: 'Message:', // 'Message:',
            },


            RedlineColorModal: {
                Header: 'Select Redline Color', // 'Select Redline Color',
                PickColor: 'Pick Color:', // 'Pick Color:',
                SelectColor: 'Select:', // 'Select:',
                Blue: 'Blue', // 'Blue',
                Red: 'Red', // 'Red',
                Yellow: 'Yellow', // 'Yellow',
                Orange: 'Orange', // 'Orange',
                Green: 'Green', // 'Green',
                Purple: 'Purple', // 'Purple',
                Brown: 'Brown', // 'Brown',
                Gray: 'Gray', // 'Gray',
                OK: 'OK' // 'OK'
            },

            RedlineEllipseModal: {
                Header: 'Select Redline Shape', // 'Select Redline Shape',
                SelectType: 'Select:', // 'Select:',
                Ellipse: 'Ellipse', // 'Ellipse',
                Cloud: 'Cloud', // 'Cloud',
                OK: 'OK' // 'OK'
            },

            BackgroundColorModal: {
                Header: '배경색을 선택하세요.', // 'Select Background Color',
                PickColor: '설정된 색:', // 'Pick Color:',
                SelectColor: '선택:', // 'Select:',
                White: 'Whte', // 'White',
                Black: 'Black', // 'Black',
                Azure: 'Azure', // 'Azure',
                Pink: 'Pink', // 'Pink',
                Snow: 'Snow', // 'Snow',
                Silver: 'Silver', // 'Silver',
                Gray: 'Gray', // 'Gray',
                Brown: 'Brown', // 'Brown',
                OK: 'OK' // 'OK'
            },

            RedlineTextModal: {
                Header: 'Redline 문자열', // 'Redline Text',
                FontSize: '폰트 크기:', // 'Font Size:',
                OK: 'OK', // 'OK',
                Text: '텍스트를 입력하고 확인을 클릭하고 도면에서 삽입 점을 선택합니다.', // 'Enter text, click OK and select the insertion point in the drawing.',
            },

            LineThicknessModal: {
                Header: '선 두깨 조절', // 'Adjust Line Thickness',
                LineThickness: '선 두께:', // 'Line Thickness:',
            },

            CalibrateModal: {
                Header: '측정 단위 설정', // 'Calibrate Measurement',
                Unit: '단위:', // 'Unit:',
                Distance: '거리:', // 'Distance:',
                OK: 'OK', // 'OK',
                Text: '도면위에 마우스로 두 점을 먼저 선택한 다음, 그 때까지와 거리를 입력하고 확인을 누릅니다.', // 'Select two points in the drawing with the mouse first, then enter unit and distance and press OK.',
            },

            MeasurementModal: {
                Header: '측점', // 'Measurement',
                Distance: '거리: ', // 'Distance: ',
                MeasureAgain: '다시 측정', // 'Measure Again',												
                ClosePolygon: '면적측정 도형 폐합', // 'Close Area Polygon',
                Text: '도면에서 거리에 대한 두 점을 선택합니다.', // 'Select two points in the drawing for distance.',
                TextArea: '점 순서를 선택합니다. 영역을 두 번 클릭하거나 ESC 또는 "면적 다각형 폐합" 버튼을 클릭합니다.', // 'Select a sequence of points. Doubleclick, Esc or "Close Area" button for area.',
                Area: '면적', // 'Area',
            },

            BirdsEyeModal: {
                Header: 'Birds-Eye Window', // 'Birds-Eye Window',
            },

            ImageObjectModal: {
                Header: 'Image Object Nr. ', // 'Image Object Nr. ',
                LoadImage: 'Load New Image', // 'Load New Image',
                RemoveImageNote: 'Remove Image Note', // 'Remove Image Note',
                MinimizeImageNote: 'Minimize Image Note', // 'Minimize Image Note',
            },

            LayerListModal: {
                Header: '레이어 목록', // 'Layer List',
                Search: '조회', // 'Search',
                Sort: '레이어 정렬', // 'Sort by Layer',
                AllLayerOn: '모든 레이어 On', // 'All Layer On',
                AllLayerOff: '모든 레이어 Off', // 'All Layer Off',
                SwapLayers: '모든 레이어 토글', // 'Swap All Layers',
                On: 'ON', // 'ON',
                Off: 'OFF', // 'OFF',
            },

            PageChangeListModal: {
                Header: 'Change Drawing Page', // 'Change Drawing Page',
                Search: 'Search', // 'Search',
                Sort: 'Sort by Name', // 'Sort by Name',
                On: 'ON', // 'ON',
                Off: 'OFF', // 'OFF',
            },


            LayerListSpaceModal: {
                Header: 'Layer List - Space Objects', // 'Layer List - Space Objects',
                Search: 'Search', // 'Search',
                Sort: 'Sort by Layer', // 'Sort by Layer',
                AllLayerOn: 'All Layer On', // 'All Layer On',
                AllLayerOff: 'All Layer Off', // 'All Layer Off',
                SwapLayers: 'Swap All Layers', // 'Swap All Layers',
                On: 'ON', // 'ON',
                Off: 'OFF', // 'OFF',
                NotAssigned: 'Not Assigned', // 'Not Assigned',
                TextLayer: 'Text Layer', // 'Text Layer',
                RoomLayer: 'Room Layer', // 'Room Layer',
            },

            IconPage_p1_8: {
                PreviousPage: '이전 아이콘 페이지', // 'Previous Icon Page',
                NextPage: '다음 아이콘 페이지', // 'Next Icon Page',
                LayerList: '레이어 목록', // 'Layer List',
                Print: '출력', // 'Print',
                ZoomIn: 'Zoom In', // 'Zoom In',
                ZoomOut: 'Zoom Out', // 'Zoom Out',
                ZoomExtents: 'Zoom Extents', // 'Zoom Extents',
                ZoomWindow: 'Zoom Window', // 'Zoom Window',
                Toggle: 'Toggle Black/White', // 'Toggle Black/White',
                Background: 'Background Color', // 'Background Color',
                FileLoad: 'File Load', // 'File Load',
                Search: 'Search Text', // 'Search Text',
                About: 'About', // 'About',
                LayerOff: 'Layer Off', // 'Layer Off',
                SwapLayers: 'Swap Layers', // 'Swap Layers',
                AllLayersOn: 'All Layers On', // 'All Layers On',
                Measurement: 'Measurement', // 'Measurement',
                Calibrate: 'Calibrate Measurement', // 'Calibrate Measurement',
                BirdsEye: 'Toggle Birds-Eye Window', // 'Toggle Birds-Eye Window',
                LineThickness: 'Adjust Line Thickeness', // 'Adjust Line Thickeness',
            },

            IconPage_p2_8: {
                PreviousPage: '이전 아이콘 페이지', // 'Previous Icon Page',
                NextPage: '다음 아이콘 페이지', // 'Next Icon Page',
                SaveRedline: 'Save Redline', // 'Save Redline',
                LoadRedline: 'Load Redline', // 'Load Redline',
                DeleteSingle: 'Delete Single Redline', // 'Delete Single Redline',
                DeleteLast: 'Delete Last Redline', // 'Delete Last Redline',
                Color: 'Redline Color', // 'Redline Color',
                Thickness: 'Redline Thickness', // 'Redline Thickness',
                StickyNote: 'Make StickyNote', // 'Make StickyNote',
                ClearAll: 'Clear Visible Redlines', // 'Clear Visible Redlines',
                Freehand: 'Freehand Redline', // 'Freehand Redline',
                Cloud: 'Redline Ellipse/Cloud', // 'Redline Ellipse/Cloud',
                FilledPolygon: 'Redline Filled Polygon', // 'Redline Filled Polygon',
                Polyline: 'Redline Polyline', // 'Redline Polyline',
                Polygon: 'Redline Polygon', // 'Redline Polygon',
                FilledRectangle: 'Filled Redline Rectangle', // 'Filled Redline Rectangle',
                Rectangle: 'Redline Rectangle', // 'Redline Rectangle',
                Arrow: 'Redline Arrow', // 'Redline Arrow',
                Text: 'Redline Text', // 'Redline Text',
                PublishAsPDF: 'Publish as PDF', // 'Publish as PDF',
                MergeAsDXF: 'Merge Redline with Source DWG', // 'Merge Redline with Source DWG',
                Free: 'Free', // 'Free',
            },

            IconPage_p3_8: {
                PreviousPage: '이전 아이콘 페이지', // 'Previous Icon Page',
                NextPage: '다음 아이콘 페이지', // 'Next Icon Page',
                PublishAsPDF: 'Publish as PDF', // 'Publish as PDF',
                Free: 'Free', // 'Free',
                LoadLink: 'Load All Image Links', // 'Load All Image Links',
                InsertLink: 'Insert Image Link', // 'Insert Image Link',
                SaveLink: 'Save All Image Links', // 'Save All Image Links',
                ClearLink: 'Clear All Image Links', // 'Clear All Image Links',
                QuickCount: 'Quick Count', // 'Quick Count',
                CountSum: 'Summary Quick Count', // 'Summary Quick Count',
                ClearCount: 'Clear Quick Count', // 'Clear Quick Count',
                LayerOff: 'Layer Off', // 'Layer Off',
                SwapLayers: 'Swap Layers', // 'Swap Layers',
                AllLayersOn: 'All Layers On', // 'All Layers On',
                ZoomExtents: 'Zoom Extents', // 'Zoom Extents',
                ZoomWindow: 'Zoom Window', // 'Zoom Window',
            },


            IconPage_p4_8: {
                PreviousPage: '이전 아이콘 페이지', // 'Previous Icon Page',
                NextPage: '다음 아이콘 페이지', // 'Next Icon Page',
                Free: 'Free', // 'Free',
                CompareLoad: 'Load Second Drawing for Compare', // 'Load Second Drawing for Compare',
                CompareToggle: 'Toggle Drawings individually', // 'Toggle Drawings individually',
                CompareToggleOverlay: 'Toggle overlaid Drawings', // 'Toggle overlaid Drawings',
                CompareExit: 'Exit Compare Drawings', // 'Exit Compare Drawings',
                CollaborationJoinSession: 'Join Collaboration Session', // 'Join Collaboration Session',
                CollaborationTakeControl: 'Take Control over Collaboration Session', // 'Take Control over Collaboration Session',
                CollaborationClearSession: 'Clear Redlines in Collaboration Session', // 'Clear Redlines in Collaboration Session',
                CollaborationLeaveSession: 'Leave Collaboration Session', // 'Leave Collaboration Session',
                LayerOff: 'Layer Off', // 'Layer Off',
                SwapLayers: 'Swap Layers', // 'Swap Layers',
                AllLayersOn: 'All Layers On', // 'All Layers On',
                ZoomExtents: 'Zoom Extents', // 'Zoom Extents',
                ZoomWindow: 'Zoom Window', // 'Zoom Window',
            },

            IconPage_p5_8: {
                PreviousPage: '이전 아이콘 페이지', // 'Previous Icon Page',
                NextPage: '다음 아이콘 페이지', // 'Next Icon Page',
                Publish: 'View Space Object Structure in User Display Mode', // 'View Space Object Structure in User Display Mode',
                DownloadSVG: 'Download processed SVG drawing', // 'Download processed SVG drawing',
                Load: 'Load Floorplan and pre-process Space Objects', // 'Load Floorplan and pre-process Space Objects',
                Settings: 'Settings', // 'Settings',
                SelectObject: 'Select Object', // 'Select Object',
                Rect: 'Rectangle Space Object', // 'Rectangle Space Object',
                Polygon: 'Polygon Space Object', // 'Polygon Space Object',
                Circle: 'Circle Space Object', // 'Circle Space Object',
                CopyCircle: 'Copy Circle Space Object', // 'Copy Circle Space Object',
                Delete: 'Delete Space Object', // 'Delete Space Object',
                LayerList: 'Layer List', // 'Layer List',
                Mode: 'Toggle Space Object Display and Edit Mode', // 'Toggle Space Object Display and Edit Mode',
                Free: 'Free', // 'Free',
                SelectPolygon: 'Generate Space Object on closed polygon', // 'Generate Space Object on closed polygon',
                LayerOff: 'Layer Off', // 'Layer Off',
                SwapLayers: 'Swap Layers', // 'Swap Layers',
                AllLayersOn: 'All Layers On', // 'All Layers On',
                ZoomExtents: 'Zoom Extents', // 'Zoom Extents',
                ZoomWindow: 'Zoom Window', // 'Zoom Window',
            },

            PageModal: {
                SelectPageFromList: 'Select Drawing Page From List', // 'Select Drawing Page From List',
                EnterPage: 'Enter page number', // 'Enter page number',
                RotateBack: 'Rotate 90 degrees counter clockwise', // 'Rotate 90 degrees counter clockwise',
                RotateForward: 'Rotate 90 degrees clockwise', // 'Rotate 90 degrees clockwise',
                First: 'Load First Page in Drawing', // 'Load First Page in Drawing',
                Previous: 'Load Previous Page in Drawing', // 'Load Previous Page in Drawing',
                Next: 'Load Next Page in Drawing', // 'Load Next Page in Drawing',
                Last: 'Load Last Page in Drawing', // 'Load Last Page in Drawing',
                ZoomExtents: 'Zoom Extents', // 'Zoom Extents',
                ZoomWindow: 'Zoom Window', // 'Zoom Window',
            },

            StickyNote: {
                MoveNote: 'Move Note', // 'Move Note',
                EditNote: 'Edit Note', // 'Edit Note',
                DeleteNote: 'Delete Note', // 'Delete Note',
                MinimizeNote: 'Minimize Note', // 'Minimize Note',
                Inactive: 'Inactive', // 'Inactive',
                SaveNote: 'Save Note', // 'Save Note',
                Cancel: 'Cancel Edit Note', // 'Cancel Edit Note',
            },

            ImageObject: {
                InsertReplace: 'Replace or Insert Image', // 'Replace or Insert Image',
                Delete: 'Delete Image and Associated Icon', // 'Delete Image and Associated Icon',
                Minimize: 'Minimize Image Object', // 'Minimize Image Object',
            },

            DeleteModal: {
                Header: 'Delete', // 'Delete',
                Text1: 'This action will remove', //  'This action will remove',
                Text2: 'and disable access to the floor plan for all users.', // 'and disable access to the floor plan for all users.',

            },

            UnlinkModal: {
                Header: 'Unlink', // 'Unlink',
                Text1: 'This action will remove all metadata from', // 'This action will remove all metadata from',
                Text2: 'Location objects will remain unchanged.', // 'Location objects will remain unchanged.',
            },

            ClearModal: {
                Header: 'Clear', // 'Clear',
                Text1: 'This action will remove all metadata and location objects from', // 'This action will remove all metadata and location objects from',
            },

            FileLoadSpaceModal: {
                Header: 'CADViewer JS: Space Management File Loader', // 'CADViewer JS: Space Management File Loader',
                DrawingFilename: 'DRAWING / FILENAME', // 'DRAWING / FILENAME',
                EditFloorplanInfo: 'Edit Floor Plan Info', // 'Edit Floor Plan Info',
                BuildRoomTextHyperlinks: 'Build ROOM/TEXT Layer Hyperlinks on Load', // 'Build ROOM/TEXT Layer Hyperlinks on Load',
            },

            LoadingModal: {
                Loading: '로딩중', // 'Loading',
            },

            DataMaps: {
                Map: ['Data Maps - User Map 1', 'Data Maps - User Map 2', 'Data Maps - User Map 3', 'Data Maps - User Map 4'] // [ 'Data Maps - User Map 1', 'Data Maps - User Map 2', 'Data Maps - User Map 3', 'Data Maps - User Map 4' ]
                //					  	Map2: 'Data Maps - User Map 2',
                //					  	Map3: 'Data Maps - User Map 3',
                //					  	Map4: 'Data Maps - User Map 4',
            },

            HeaderObjectLayers: {
                ObjectLayer: ['Spaces - User Layer 1', 'Assets - User Layer 2'] // ['Spaces - User Layer 1', 'Assets - User Layer 2' ]
                //					  	ObjectLayer2: 'Assets - User Layer 2',
            },

            WaitModal: {
                Printing: '출력중', // 'Printing',
                Thumbnails: '저장중', // 'Saving',
                BatchPDF: 'PDF로 출력', // 'Print to PDF',
                MergeDWG: 'Merging', // 'Merging',

            }
        }
    ]