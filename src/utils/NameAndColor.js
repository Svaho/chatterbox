
function getRandomName() {
    const ime = [
     'Marko', 'Ante', 'Tino', 'Dino', 'Ino', 'Idriz', 'Krpa', 'Brajo', 'Stari', 'Mirza', 'Tomo', 'Tomislav', 'Antea', 'Antena', 'Magdalena', 'Matilda', 'Zdeslav', 'Svaho',
     'Tito', 'Marin', 'Elizabeta', 'Vili', 'Hrvoje'
    ];
    const prezime = [
      'Prže', 'Borat', 'Dužević', 'Marin', 'Jakovljević', 'Hrvatić', 'Prezime', 'Hadžihafizbegović', 'Bašić', 'Žlica', 'Bego', 'Didović', 'Pavlović', 'Ignocije', 'Muha',
      'Antonulović', 'Kim', 'Punjač', 'Balota', 'Bolanča', 'Bakičić', 'Uspinjač', 'Troković'
    ];
    const Name = ime[Math.floor(Math.random() * ime.length )];
    const Surname = prezime[Math.floor(Math.random() * prezime.length)];
    return Name + " " + Surname;
  }
  
  function getMemberColor() {
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  }

 export default (getMemberColor, getRandomName)