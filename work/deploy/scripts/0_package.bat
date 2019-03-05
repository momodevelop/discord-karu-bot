@echo "Packaging..."

@SET PROGRAM_PATH=..\..\program
@SET PACKAGE_PATH=..\package
@SET CONTROL_PATH=..\control
@SET ENV_PATH=..\env

rmdir %PACKAGE_PATH% /s /q
mkdir %PACKAGE_PATH%
mkdir %PACKAGE_PATH%\src
mkdir %PACKAGE_PATH%\img
mkdir %PACKAGE_PATH%\node_modules


xcopy /S /Y %CONTROL_PATH% %PACKAGE_PATH%\src /EXCLUDE:package_exclude_list.txt
xcopy /S /Y %ENV_PATH% %PACKAGE_PATH%\src /EXCLUDE:package_exclude_list.txt
xcopy /S /Y %PROGRAM_PATH%\out %PACKAGE_PATH%\src /EXCLUDE:package_exclude_list.txt
xcopy /S /Y %PROGRAM_PATH%\img %PACKAGE_PATH%\img /EXCLUDE:package_exclude_list.txt
xcopy /S /Y %PROGRAM_PATH%\node_modules %PACKAGE_PATH%\node_modules /EXCLUDE:package_exclude_list.txt

pause