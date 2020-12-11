#!/usr/bin/bash
#
# rsync from checklists (git) to isopsdb
#
cd ~/sb/yute/checklists
rsync -av --exclude-from 'ignore_checklists.txt' . ~/isopsdb

find ~/isopsdb -type d -name __pycache__ -exec rm -rf {} \;
