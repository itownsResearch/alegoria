# Notes on the tools of semi-automatic registration of images and visualisation

![alt text](https://raw.githubusercontent.com/itownsResearch/docs/master/oldProj2.gif "Alegoria")

## Installation

The alegoria Web Tools use iTowns as a submodule so in order to get the sources and the builts:

```
git clone --recursive https://github.com/itownsResearch/alegoria
```

You're done!
Now launch your favorite http-server (you'll need php for the semi-automatic registration tool) and access the demo here

- http://localhost/alegoria/src/oriented_images.html   (visualization of oriented images)
- http://localhost/alegoria/src/globe.html             (semi-automatic registration tool)



## SAISIE
Globe.html est la page qui permet d'effectuer la **saisie**

1) Placer la camera de la scene ds un point de vue qui ressemble à celui de la photo ancienne ( Ctrl-click permet la rotation, LeftClick la translation,... )
    Il est possible d'initialiser la position de la camera ds le code.

2) Saisir les points de correspondance: 
    - Shift-click dans l'image ancienne pour saisir un point 2D image
    - Alt-click dans la scène 3D pour saisir un point terrain.

    Il est nécessaire de saisir au moins 7 points homologues (procéder par alternance image-terrain, image-terrain...)

3) Lancer Micmac à l'aide du bouton sous l'image à recaler.


### Notes:
Le nom de l'image à recaler est à indiquer dans la balise img, src en haut du fichier
   ex ->  <img id="img" src="../../data/FRAN_0207_0558_L.jpg" onmousedown="getImgCoordOnClick(event)">

La saisie permet de générer les fichiers de points d'appuis appuis_NomImage.xml et points au sol, gcp_NomImage.xml


Comme les images historiques ont dans les EXIF les informations de scanner ou pas d'exif ou autre exif pas utile pour nousn il faut veiller à indiquer soit de ne pas utiliser ces exifs soit à nommer un fichier avec le nom de l'appareil photo contenant PPA, image size, et focal.

Mouna_partie_itowns\outputs\test\MicMac-LocalChantierDescripteur.xml, Ori-CalInit/AutoCal_Foc-50000_Cam-defaultCam.xml sont les 2 fichiers permettant de gérer la calibration

Le fichier de calibration est créé automatiquement: voir le fichier exemple Ori-CalInit/AutoCal_Foc-50000_Cam-defaultCam.xml. On estime la focale avec image width * 36/50mm pour un objectif 50mm par ex.

Donc soit l'image a des infos EXIF et dans ce cas il faut que le fichier autocal reprenne le nom du modele de cam de l'exif (exemple ave cle scanner supraScan...), soit si pas d'exif il faut un fichier qui s'appelle 'AutoCal_Foc-50000.xml', enfin selon ce qui est défini dans le Micmac-LocalChantierDescripteur ( CalcName 50.0 ).




## VISUALISATION
oriented_images.html est la page qui permet de visualiser les images recalées
En haut de la page, on définit la/les images à visualiser 

 arrayImages = [{image: 'FRAN_0207_0558_L.jpg',distance: 2000,opacity: 1, plane:null}, 
                {image: 'FRAN_0207_0559_L.jpg',distance: 2000,opacity: 1, plane:null}];
           

Attention aux différents répertoires indiqués dans le code. Tel quel, nous avons "Mouna_partie_itowns\outputs\test\Ori-Aspro" qui contient les infos d'ori de l'image recalée
ex: Orientation-FRAN_0207_0558_L.jpg

Les images elles-mêmes sont dans Mouna_partie_itowns\data


Dans le menu Oriented Image il est possible de faire varier la distance et l'opacité de l'image recalée

