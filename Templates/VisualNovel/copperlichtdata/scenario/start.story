@macro|TEST1 fg=index t=time|
|MOVE fg=index t=time x=0 y=5 z=5|
@endmacro
@macro|TEST2 fg=index t=time|
|MOVE fg=index t=time x=1 y=0 z=0|
|MOVE fg=index t=time x=-1 y=0 z=0|
|MOVE fg=index t=time x=0 y=0 z=0|
@endmacro
|TEST1 fg=0 t=500|FX index=0|
NVL Girl:idle:Hello!:00001
|TEST2 fg=0 t=250|MOVE fg=0 x=0 y=5 z=0 t=250|
NVL Girl:idle:Why are you so happy?:00002
NVL Girl:smile:$first name$ $last name$,My RPG Dialogue system is going to be easy finally!:00003
NVL Girl:idle:Wow man I can't believe it you created that game in coppercube!:00004
NVL Girl:smile:Yeah, I am glad that I was able to do it:00005