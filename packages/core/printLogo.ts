export default function () {
  if (PROD) {
    const logo = `
__________________________________________________________________________________________________________

   _______         __                                  _______  __                                 __   
  |     __|.---.-.|  |--..---.-..-----..---.-. ______ |    ___||  |.-----..--------..-----..-----.|  |_ 
  |__     ||  _  ||    < |  _  ||     ||  _  ||______||    ___||  ||  -__||        ||  -__||     ||   _|
  |_______||___._||__|__||___._||__|__||___._|        |_______||__||_____||__|__|__||_____||__|__||____|
                                                                                                                              
__________________________________________________________________________________________________________
                                           author:Sakana
`;

    const rainbowGradient = `
background: linear-gradient(135deg, orange 60%, cyan);
background-clip: text;
color: transparent;
font-size: 16px; 
line-height: 1;
font-family: monospace;
font-weight: 600;
`;

    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.log('[Sakana-Element]:dev mode...');
  }
}
