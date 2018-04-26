#include <AutoItConstants.au3>




Example()

Func Example()


    ; Wait 10 seconds for the Notepad window to appear.
    Local $hWnd = WinWait("[CLASS:ApplicationFrameWindow]", "", 10)
   ;WinSetState($hWnd, "", @SW_RESTORE)
    ; Activate the Notepad window using the handle returned by WinWait.
    WinActivate($hWnd)
   MouseClick($MOUSE_CLICK_LEFT, 828, 388, 1)
   Sleep(3000)
    ; Close the Notepad window using the handle returned by WinWait.
    ;WinClose($hWnd)
EndFunc   ;==>Example