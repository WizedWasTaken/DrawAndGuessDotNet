@echo off
:: Enable delayed variable expansion for better error handling
setlocal enabledelayedexpansion

:: Set the root project path to avoid repetitive typing
set "PROJECT_ROOT=C:\Projekter\[Systemudvikling]\[Lab-S]\DrawAndGuessDotNet\source\DrawAndGuess"

:: Check if the path exists, otherwise exit with an error
if not exist "%PROJECT_ROOT%\DrawAndGuess.SignalR" (
    echo ERROR: The path "%PROJECT_ROOT%\DrawAndGuess.SignalR" does not exist.
    pause
    exit /b 1
)

if not exist "%PROJECT_ROOT%\DrawAndGuess.API" (
    echo ERROR: The path "%PROJECT_ROOT%\DrawAndGuess.API" does not exist.
    pause
    exit /b 1
)

if not exist "%PROJECT_ROOT%\DrawAndGuess.Client\client" (
    echo ERROR: The path "%PROJECT_ROOT%\DrawAndGuess.Client\client" does not exist.
    pause
    exit /b 1
)

:: Open a new vertical split for DrawAndGuess.SignalR (C#) using Command Prompt
echo Starting DrawAndGuess.SignalR...
wt -w 0 split-pane -V -p "Command Prompt" cmd /k "cd %PROJECT_ROOT%\DrawAndGuess.SignalR && dotnet run"
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to start DrawAndGuess.SignalR.
    pause
    exit /b 1
)

:: Open a new horizontal split for DrawAndGuess.API (C#) using Command Prompt
echo Starting DrawAndGuess.API...
wt -w 0 split-pane -H -p "Command Prompt" cmd /k "cd %PROJECT_ROOT%\DrawAndGuess.API && dotnet run"
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to start DrawAndGuess.API.
    pause
    exit /b 1
)

:: Start the Next.js frontend server in the same window
echo Starting DrawAndGuess.Frontend...
wt -w 0 cmd /k "cd %PROJECT_ROOT%\DrawAndGuess.Client\client && npm run dev --force"
if %ERRORLEVEL% neq 0 (
    echo ERROR: Failed to start DrawAndGuess.Frontend.
    pause
    exit /b 1
)

:: All servers started successfully
echo All servers started successfully!
pause
