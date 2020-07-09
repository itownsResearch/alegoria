#echo "First arg: $1";
# We remove previous data
nameOld=${1%.jpg};
rm -f ../data/sceneiTowns.tif;
rm -f ../data/$nameOld.tif;
rm -f pts_image1_image2.result;
rm -f pts_image1_image2.resultfiltre;
convert -compress none ../data/sceneiTowns.png ../data/sceneiTowns.tif;
convert -compress none ../data/$1 ../data/$nameOld.tif;
./../../../deeplearning/Detection.LINUX  ../data/sceneiTowns.tif export_pts.key --maxlocaux --Mu ../../../deeplearning/Mu.tif --SigmaInv ../../../deeplearning/SigmaInv.tif;
./../../../deeplearning/Appariement.LINUX Points:Image export_pts.key ../data/$nameOld.tif  pts_image1_image2.result  --agarder proportionagarder --Mu ../../../deeplearning/Mu.tif --SigmaInv ../../../deeplearning/SigmaInv.tif;
./../../../deeplearning/RANSAC.LINUX pts_image1_image2.result pts_image1_image2.resultfiltre > /dev/null;