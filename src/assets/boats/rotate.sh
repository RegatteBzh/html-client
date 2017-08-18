#!/bin/bash

FILE=imoca60/imoca

# 1. Create ProgressBar function
# 1.1 Input is currentState($1) and totalState($2)
function ProgressBar {
    # Process data
        let _progress=(${1}*100/${2}*100)/100
        let _done=(${_progress}*4)/10
        let _left=40-$_done
    # Build progressbar string lengths
        _fill=$(printf "%${_done}s")
        _empty=$(printf "%${_left}s")

    # 1.2 Build progressbar strings and print the ProgressBar line
    # 1.2.1 Output example:
    # 1.2.1.1 Progress : [########################################] 100%
    printf "\rProgress : [${_fill// /#}${_empty// /-}] ${_progress}%% => $3"

}

for deg in $(seq 0 359)
do
    newFile=${FILE}-$(printf "%03d" ${deg}).png
    convert -background 'rgba(0,0,0,0)' -distort ScaleRotateTranslate ${deg} +repage ${FILE}.png ${newFile}
    ProgressBar ${deg} 359 ${newFile}
done