#include <AutoItConstants.au3>




Example()

Func Example()


    Local $hWnd = WinWait($Cmdline[1], "", 1)
	;Local $hWnd = WinWait("[REGEXPCLASS:(?i)(.*)Frame]", "", 1)
	MouseClick($MOUSE_CLICK_LEFT, 55, 20, 1)
    WinActivate($hWnd)


EndFunc   ;==>Example
