git fetch

echo '�umerge conflict�v�����ꍇ�͋������������܂��傤�B'

git add --all
git commit -a -m %1
git pull -u origin pages
cd pages
git add --all
git commit -a -m %1
git pull -u origin pages
cd ../docs
git add --all
git commit -a -m %1
git pull -u origin master
cd ..