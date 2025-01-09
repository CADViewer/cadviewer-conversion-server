chcp >chcp_01.txt
chcp 850 >chcp_02.txt
set arg1=%~1
setlocal enabledelayedexpansion
set commandexe=!arg1:%%20= !
set arg2=%~2
set arg3=%~3
set arg4=%~4
set arg5=%~5
set arg6=%~6
set arg7=%~7
set arg8=%~8
set arg9=%~9
shift
set arg10=%~9
shift
set arg11=%~9
shift
set arg12=%~9
shift
set arg13=%~9
shift
set arg14=%~9
shift
set arg15=%~9
shift
set arg16=%~9
shift
set arg17=%~9

"%commandexe%" %arg2% %arg3% %arg4% %arg5% %arg6% %arg7% %arg8% %arg9% %arg10% %arg11% %arg12% %arg13% %arg14% %arg15% %arg16% %arg17%   >ax2020_01.txt
rem %arg1% %arg2% %arg3% %arg4% %arg5% %arg6% %arg7% %arg8% %arg9% %arg10% %arg11% %arg12% %arg13% %arg14% %arg15% %arg16% %arg17%   >ax2020_01.txt
rem %1 %2 %3 %4 %5 %6 %7 %8 %9  >ax2020_01.txt
chcp >chcp_03.txt


