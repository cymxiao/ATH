
WinWaitActive("Authentication Required","","20")
if(WinExists("Authentication Required")) Then
Send("webber-ling{TAB}")
Send("********({ENTER}")
EndIf

