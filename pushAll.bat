git fetch

echo '�����[�g�Ƌ��������ꍇ��pullAll.bat�𓯗l�Ɏ��s���Ă݂Ă��������B'

git add --all
git commit -a -m %1
git push -u origin src
cd pages
git add --all
git commit -a -m %1
git push -u origin pages
cd ../docs
git add --all
git commit -a -m %1
git push -u origin master
cd ..