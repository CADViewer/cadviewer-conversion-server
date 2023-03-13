rem Set path to where your executable is
rem 
set exepath=c:\axpath\AX2023  
call :treeProcess
exit /b

:treeProcess
for %%f in (*.dwg) do call :processFile "%%f"
for /D %%d in (*) do (
    cd %%d
    call :treeProcess
    cd ..
)
exit /b

:processFile
set fName=%1%
for /f "useback tokens=*" %%a in ('%fName%') do set fName=%%~a
set svgName=%fName:.dwg=.svg%
%exepath% "%fName%"  "%svgName%"  -svg
exit /b