set exelatest=c:\ax2023\AX2023
call :treeProcess
exit /b

:treeProcess
for %%f in (*.dgn) do call :processFile "%%f"
for /D %%d in (*) do (
    cd %%d
    call :treeProcess
    cd ..
)
exit /b

:processFile
set fName=%1%
for /f "useback tokens=*" %%a in ('%fName%') do set fName=%%~a
set svgName=%fName:.dgn=.pdf%
%exelatest% "%fName%"  "%svgName%"  -pdf -xpath="C:\batch\ax2023\files" -fontpath="C:\batch\ax2023\fonts"
exit /b