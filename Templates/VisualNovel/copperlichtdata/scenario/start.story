@macro|TEST1 fg=index t=time|
|MOVE fg=index t=time x=0 y=5 z=5|
@endmacro

@macro|TEST2 fg=index t=time|
|MOVE fg=index t=time x=0 y=0 z=0|
|MOVE fg=index t=time x=1 y=0 z=0|
|MOVE fg=index t=time x=-1 y=0 z=0|
|MOVE fg=index t=time x=0 y=0 z=0|
@endmacro

@macro|TEST3 text1=TEXT_0 text2=TEXT_1 js1=JSCODE_0 js2=JSCODE_1|
|BTN index=0 text=TEXT_0 x=0.4 y=0.4 w=0.1 h=0.1 js=JSCODE_0|
|BTN index=1 text=TEXT_1 x=0.4 y=0.6 w=0.1 h=0.1 js=JSCODE_1|
@endmacro

#define
|积分=0|
#enddefine
|TEST1 fg=0 t=300|
NVL Girl:idle:Hello!:00001
~sync
|TEST2 fg=0 t=150|
|MOVE fg=1 x=0 y=-1 z=0 t=300|MOVE fg=1 x=-25 y=-1 z=25 t=300|
~endsync
NVL Girl:idle:Why are you so happy?:00002
NVL Girl:smile:$first name$ $last name$,My RPG Dialogue system is going to be easy finally!:00003
|MOVE fg=1 x=0 y=-1 z=0 t=300|TEST2 fg=0 t=150|MOVE fg=1 x=-25 y=-1 z=25 t=300|
NVL Girl:idle:Wow man I can't believe it you created that game in coppercube!:00004
|TEST3 text1=A text2=B js1=积分++ js2=积分--|
NVL Girl:smile:Yeah, I am glad that I was able to do it:00005
#branch|积分>=1|
|TEST2 fg=0 t=150|
NVL Girl:idle:You have chosen option A:00005
#endbranch
#branch|积分<1|
|TEST2 fg=0 t=150|
NVL Girl:idle:You have chosen option B:00005
#endbranch
~dialog
|character Test|
|expression test|
|text This size=22pt color=red|text is|text the|text end|
~enddialog