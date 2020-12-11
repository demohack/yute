#!/usr/bin/bash
#
# rsync from isopsdb to checklists (git)
#
cd ~/isopsdb
rsync -av --exclude-from 'ignore_isopsdb.txt' . ~/sb/yute/checklists

find ~/sb/yute/checklists -type d -name __pycache__ -exec rm -rf {} \;
