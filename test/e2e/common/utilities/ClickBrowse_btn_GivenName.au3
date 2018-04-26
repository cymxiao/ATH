#include <AutoItConstants.au3>




Example()

Func Example()


    ; Wait 10 seconds for the Notepad window to appear.
    Local $hWnd = WinWait($Cmdline[1], "", 10)
   ;WinSetState($hWnd, "", @SW_RESTORE)
    ; Activate the Notepad window using the handle returned by WinWait.
    WinActivate($hWnd)
   MouseClick($MOUSE_CLICK_LEFT, $Cmdline[2], $Cmdline[3], 1)
   Sleep(500)
    ; Close the Notepad window using the handle returned by WinWait.
    ;WinClose($hWnd)
EndFunc   ;==>Example