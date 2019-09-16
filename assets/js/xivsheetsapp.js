// Create the type of element you pass in the parameters
function createNode(element) {
  return document.createElement(element);
}

// Append the second parameter(element) to the first one
function append(parent, el) {
  return parent.appendChild(el);
}
// Target element for the sheet
const container = document.getElementById("character-sheet");
// API Url
const xivsearch = "https://xivapi.com/character/search?name=";

var input = document.getElementById("char-search");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search").click();
  }
});

// https://xivapi.com/character/9575452?extended=1 for viewing the data structure

// Search function
function search_action() {
  document.getElementById("character-sheet").innerHTML = "";
  let charInput = document.getElementById("char-search").value;
  charInput = charInput.toLowerCase();
  let serverInput = document.getElementById("server-select").value;

  //the search request
  fetch(xivsearch + charInput + `&server=` + serverInput)
    .then(resp => resp.json())
    .then(function(search) {
      let xivid = search.Results;
      return xivid.map(function(charId) {
        fetch(
          `https://xivapi.com/character/` +
            charId.ID +
            `?extended=1&data=FC&columns=Character.Name,Character.Avatar,Character.ClassJobs,Character.Gender,Character.GuardianDeity,Character.Nameday,Character.Portrait,Character.Race,Character.Server,Character.Title,Character.Town,Character.Tribe,FreeCompany`
        )
          .then(resp => resp.json())
          .then(function(playerInfo) {
            const character = playerInfo.Character;
            const FC = playerInfo.FreeCompany;
            let charaInfo = createNode("div"),
              charaClassJob = createNode("div"),
              //Character Info
              charaPortrait = createNode("img"),
              charaName = createNode("h1"),
              charaTitle = createNode("h2"),
              charaNameday = createNode("h3"),
              charaRaceTribe = createNode("h3"),
              charaFC = createNode("div"),
              charaFCIcon = createNode("img"),
              charaFCName = createNode("span"),
              charaTown = createNode("div"),
              charaTownName = createNode("span"),
              charaTownIcon = createNode("img"),
              charaDeity = createNode("div"),
              charaDeityName = createNode("span"),
              charaDeityIcon = createNode("img"),
              //ClassJob
              //Crafters
              charaARMDiv = createNode("div"),
              charaARM = createNode("img"),
              charaARMLvl = createNode("span"),
              charaBSMDiv = createNode("div"),
              charaBSM = createNode("img"),
              charaBSMLvl = createNode("span"),
              charaGSMDiv = createNode("div"),
              charaGSM = createNode("img"),
              charaGSMLvl = createNode("span"),
              charaLTWDiv = createNode("div"),
              charaLTW = createNode("img"),
              charaLTWLvl = createNode("span"),
              charaWVRDiv = createNode("div"),
              charaWVR = createNode("img"),
              charaWVRLvl = createNode("span"),
              charaCRPDiv = createNode("div"),
              charaCRP = createNode("img"),
              charaCRPLvl = createNode("span"),
              charaCULDiv = createNode("div"),
              charaCUL = createNode("img"),
              charaCULLvl = createNode("span"),
              charaALCDiv = createNode("div"),
              charaALC = createNode("img"),
              charaALCLvl = createNode("span"),
              //Gatherers
              charaBTNDiv = createNode("div"),
              charaBTN = createNode("img"),
              charaBTNLvl = createNode("span"),
              charaMINDiv = createNode("div"),
              charaMIN = createNode("img"),
              charaMINLvl = createNode("span"),
              charaFSHDiv = createNode("div"),
              charaFSH = createNode("img"),
              charaFSHLvl = createNode("span"),
              //Tanks
              charaWARDiv = createNode("div"),
              charaWAR = createNode("img"),
              charaWARLvl = createNode("span"),
              charaDRKDiv = createNode("div"),
              charaDRK = createNode("img"),
              charaDRKLvl = createNode("span"),
              charaPLDDiv = createNode("div"),
              charaPLD = createNode("img"),
              charaPLDLvl = createNode("span"),
              charaGNBDiv = createNode("div"),
              charaGNB = createNode("img"),
              charaGNBLvl = createNode("span"),
              //Healers
              charaWHMDiv = createNode("div"),
              charaWHM = createNode("img"),
              charaWHMLvl = createNode("span"),
              charaSCHDiv = createNode("div"),
              charaSCH = createNode("img"),
              charaSCHLvl = createNode("span"),
              charaASTDiv = createNode("div"),
              charaAST = createNode("img"),
              charaASTLvl = createNode("span"),
              //Melee
              charaMNKDiv = createNode("div"),
              charaMNK = createNode("img"),
              charaMNKLvl = createNode("span"),
              charaDRGDiv = createNode("div"),
              charaDRG = createNode("img"),
              charaDRGLvl = createNode("span"),
              charaNINDiv = createNode("div"),
              charaNIN = createNode("img"),
              charaNINLvl = createNode("span"),
              charaSAMDiv = createNode("div"),
              charaSAM = createNode("img"),
              charaSAMLvl = createNode("span"),
              //Ranged
              charaBRDDiv = createNode("div"),
              charaBRD = createNode("img"),
              charaBRDLvl = createNode("span"),
              charaMCHDiv = createNode("div"),
              charaMCH = createNode("img"),
              charaMCHLvl = createNode("span"),
              charaDNCDiv = createNode("div"),
              charaDNC = createNode("img"),
              charaDNCLvl = createNode("span"),
              //Casters
              charaBLMDiv = createNode("div"),
              charaBLM = createNode("img"),
              charaBLMLvl = createNode("span"),
              charaSMNDiv = createNode("div"),
              charaSMN = createNode("img"),
              charaSMNLvl = createNode("span"),
              charaRDMDiv = createNode("div"),
              charaRDM = createNode("img"),
              charaRDMLvl = createNode("span"),
              // Limited
              charaBLUDiv = createNode("div"),
              charaBLU = createNode("img"),
              charaBLULvl = createNode("span");
            charaInfo.id = `chara-info`;
            charaClassJob.id = `chara-class-jobs`;
            charaPortrait.src = character.Portrait;
            charaPortrait.id = `chara-portrait`;
            charaName.innerHTML = `${character.Name}`;
            charaName.id = `chara-name`;
            charaTitle.innerHTML = `${character.Title.Name}`;
            charaTitle.id = `chara-title`;
            charaNameday.innerHTML = `${character.Nameday}`;
            charaNameday.id = `chara-nameday`;
            charaRaceTribe.innerHTML =
              `${character.Tribe.Name}` + `&nbsp;` + `${character.Race.Name}`;
            charaRaceTribe.id = `chara-race-tribe`;
            charaFCIcon.src = `https://xivapi.com/freecompany/` + `${FC.ID}` + `/icon`;
            charaFCIcon.id = `fc-crest`;
            charaFCName.innerHTML = `${FC.Name}`;
            charaFC.id = `chara-fc-crest`;
            charaTownIcon.src = `https://xivapi.com${character.Town.Icon}`;
            charaTownIcon.id = `chara-town-icon`;
            charaTownName.innerHTML = `${character.Town.Name}`;
            charaTown.id = `chara-town`;
            charaDeityIcon.src = `https://xivapi.com${
              character.GuardianDeity.Icon
            }`;
            charaDeityIcon.id = `chara-deity-icon`;
            charaDeityName.innerHTML = `${character.GuardianDeity.Name}`;
            charaDeity.id = `chara-deity`;
            //ClassJobs
            //Crafters
            charaARM.src = `https://xivapi.com${
              character.ClassJobs[20].Job.Icon
            }`;
            charaARM.alt = `${character.ClassJobs[20].Job.Abbreviation}`;
            charaARMDiv.id = `ARM`;
            charaARMLvl.innerHTML = `${character.ClassJobs[20].Level}`;
            charaBSM.src = `https://xivapi.com${
              character.ClassJobs[19].Job.Icon
            }`;
            charaBSM.alt = `${character.ClassJobs[19].Job.Abbreviation}`;
            charaBSMDiv.id = `BSM`;
            charaBSMLvl.innerHTML = `${character.ClassJobs[19].Level}`;
            charaGSM.src = `https://xivapi.com${
              character.ClassJobs[21].Job.Icon
            }`;
            charaGSM.alt = `${character.ClassJobs[21].Job.Abbreviation}`;
            charaGSMDiv.id = `GSM`;
            charaGSMLvl.innerHTML = `${character.ClassJobs[21].Level}`;
            charaCRP.src = `https://xivapi.com${
              character.ClassJobs[18].Job.Icon
            }`;
            charaCRP.alt = `${character.ClassJobs[18].Job.Abbreviation}`;
            charaCRPDiv.id = `CRP`;
            charaCRPLvl.innerHTML = `${character.ClassJobs[18].Level}`;
            charaLTW.src = `https://xivapi.com${
              character.ClassJobs[22].Job.Icon
            }`;
            charaLTW.alt = `${character.ClassJobs[22].Job.Abbreviation}`;
            charaLTWDiv.id = `LTW`;
            charaLTWLvl.innerHTML = `${character.ClassJobs[22].Level}`;
            charaWVR.src = `https://xivapi.com${
              character.ClassJobs[23].Job.Icon
            }`;
            charaWVR.alt = `${character.ClassJobs[23].Job.Abbreviation}`;
            charaWVRDiv.id = `WVR`;
            charaWVRLvl.innerHTML = `${character.ClassJobs[23].Level}`;
            charaALC.src = `https://xivapi.com${
              character.ClassJobs[24].Job.Icon
            }`;
            charaALC.alt = `${character.ClassJobs[24].Job.Abbreviation}`;
            charaALCDiv.id = `ALC`;
            charaALCLvl.innerHTML = `${character.ClassJobs[24].Level}`;
            charaCUL.src = `https://xivapi.com${
              character.ClassJobs[25].Job.Icon
            }`;
            charaCUL.alt = `${character.ClassJobs[25].Job.Abbreviation}`;
            charaCULDiv.id = `CUL`;
            charaCULLvl.innerHTML = `${character.ClassJobs[25].Level}`;
            //Gatherers
            charaBTN.src = `https://xivapi.com${
              character.ClassJobs[27].Job.Icon
            }`;
            charaBTN.alt = `${character.ClassJobs[27].Job.Abbreviation}`;
            charaBTNDiv.id = `BTN`;
            charaBTNLvl.innerHTML = `${character.ClassJobs[27].Level}`;
            charaMIN.src = `https://xivapi.com${
              character.ClassJobs[26].Job.Icon
            }`;
            charaMIN.alt = `${character.ClassJobs[26].Job.Abbreviation}`;
            charaMINDiv.id = `MIN`;
            charaMINLvl.innerHTML = `${character.ClassJobs[26].Level}`;
            charaFSH.src = `https://xivapi.com${
              character.ClassJobs[28].Job.Icon
            }`;
            charaFSH.alt = `${character.ClassJobs[28].Job.Abbreviation}`;
            charaFSHDiv.id = `FSH`;
            charaFSHLvl.innerHTML = `${character.ClassJobs[28].Level}`;
            //Tanks
            charaPLD.src = `https://xivapi.com${
              character.ClassJobs[0].Job.Icon
            }`;
            charaPLD.alt = `${character.ClassJobs[0].Job.Abbreviation}`;
            charaPLDDiv.id = `PLD`;
            charaPLDLvl.innerHTML = `${character.ClassJobs[0].Level}`;
            charaWAR.src = `https://xivapi.com${
              character.ClassJobs[1].Job.Icon
            }`;
            charaWAR.alt = `${character.ClassJobs[1].Job.Abbreviation}`;
            charaWARDiv.id = `WAR`;
            charaWARLvl.innerHTML = `${character.ClassJobs[1].Level}`;
            charaDRK.src = `https://xivapi.com${
              character.ClassJobs[2].Job.Icon
            }`;
            charaDRK.alt = `${character.ClassJobs[2].Job.Abbreviation}`;
            charaDRKDiv.id = `DRK`;
            charaDRKLvl.innerHTML = `${character.ClassJobs[2].Level}`;
            charaGNB.src = `https://xivapi.com${
              character.ClassJobs[3].Job.Icon
            }`;
            charaGNB.alt = `${character.ClassJobs[3].Job.Abbreviation}`;
            charaGNBDiv.id = `GNB`;
            charaGNBLvl.innerHTML = `${character.ClassJobs[3].Level}`;
            //Healers
            charaWHM.src = `https://xivapi.com${
              character.ClassJobs[8].Job.Icon
            }`;
            charaWHM.alt = `${character.ClassJobs[8].Job.Abbreviation}`;
            charaWHMDiv.id = `WHM`;
            charaWHMLvl.innerHTML = `${character.ClassJobs[8].Level}`;
            charaSCH.src = `https://xivapi.com${
              character.ClassJobs[9].Job.Icon
            }`;
            charaSCH.alt = `${character.ClassJobs[9].Job.Abbreviation}`;
            charaSCHDiv.id = `SCH`;
            charaSCHLvl.innerHTML = `${character.ClassJobs[9].Level}`;
            charaAST.src = `https://xivapi.com${
              character.ClassJobs[10].Job.Icon
            }`;
            charaAST.alt = `${character.ClassJobs[10].Job.Abbreviation}`;
            charaASTDiv.id = `AST`;
            charaASTLvl.innerHTML = `${character.ClassJobs[10].Level}`;
            //Melee
            charaMNK.src = `https://xivapi.com${
              character.ClassJobs[4].Job.Icon
            }`;
            charaMNK.alt = `${character.ClassJobs[4].Job.Abbreviation}`;
            charaMNKDiv.id = `MNK`;
            charaMNKLvl.innerHTML = `${character.ClassJobs[4].Level}`;
            charaDRG.src = `https://xivapi.com${
              character.ClassJobs[5].Job.Icon
            }`;
            charaDRG.alt = `${character.ClassJobs[5].Job.Abbreviation}`;
            charaDRGDiv.id = `DRG`;
            charaDRGLvl.innerHTML = `${character.ClassJobs[5].Level}`;
            charaNIN.src = `https://xivapi.com${
              character.ClassJobs[6].Job.Icon
            }`;
            charaNIN.alt = `${character.ClassJobs[6].Job.Abbreviation}`;
            charaNINDiv.id = `NIN`;
            charaNINLvl.innerHTML = `${character.ClassJobs[6].Level}`;
            charaSAM.src = `https://xivapi.com${
              character.ClassJobs[7].Job.Icon
            }`;
            charaSAM.alt = `${character.ClassJobs[7].Job.Abbreviation}`;
            charaSAMDiv.id = `SAM`;
            charaSAMLvl.innerHTML = `${character.ClassJobs[7].Level}`;
            //Ranged
            charaBRD.src = `https://xivapi.com${
              character.ClassJobs[11].Job.Icon
            }`;
            charaBRD.alt = `${character.ClassJobs[11].Job.Abbreviation}`;
            charaBRDDiv.id = `BRD`;
            charaBRDLvl.innerHTML = `${character.ClassJobs[11].Level}`;
            charaMCH.src = `https://xivapi.com${
              character.ClassJobs[12].Job.Icon
            }`;
            charaMCH.alt = `${character.ClassJobs[12].Job.Abbreviation}`;
            charaMCHDiv.id = `MCH`;
            charaMCHLvl.innerHTML = `${character.ClassJobs[12].Level}`;
            charaDNC.src = `https://xivapi.com${
              character.ClassJobs[13].Job.Icon
            }`;
            charaDNC.alt = `${character.ClassJobs[13].Job.Abbreviation}`;
            charaDNCDiv.id = `DNC`;
            charaDNCLvl.innerHTML = `${character.ClassJobs[13].Level}`;
            //Casters
            charaBLM.src = `https://xivapi.com${
              character.ClassJobs[14].Job.Icon
            }`;
            charaBLM.alt = `${character.ClassJobs[14].Job.Abbreviation}`;
            charaBLMDiv.id = `BLM`;
            charaBLMLvl.innerHTML = `${character.ClassJobs[14].Level}`;
            charaSMN.src = `https://xivapi.com${
              character.ClassJobs[15].Job.Icon
            }`;
            charaSMN.alt = `${character.ClassJobs[15].Job.Abbreviation}`;
            charaSMNDiv.id = `SMN`;
            charaSMNLvl.innerHTML = `${character.ClassJobs[15].Level}`;
            charaRDM.src = `https://xivapi.com${
              character.ClassJobs[16].Job.Icon
            }`;
            charaRDM.alt = `${character.ClassJobs[16].Job.Abbreviation}`;
            charaRDMDiv.id = `RDM`;
            charaRDMLvl.innerHTML = `${character.ClassJobs[16].Level}`;
            //Limited
            charaBLU.src = `https://xivapi.com${
              character.ClassJobs[17].Job.Icon
            }`;
            charaBLU.alt = `${character.ClassJobs[17].Job.Abbreviation}`;
            charaBLUDiv.id = `BLU`;
            charaBLULvl.innerHTML = `${character.ClassJobs[17].Level}`;
            append(container, charaPortrait);
            append(container, charaInfo);
            append(container, charaClassJob);
            append(charaInfo, charaName);
            append(charaInfo, charaTitle);
            append(charaInfo, charaNameday);
            append(charaInfo, charaRaceTribe);
            append(charaInfo, charaFC);
            append(charaFC, charaFCIcon);
            append(charaFC, charaFCName);
            append(charaInfo, charaTown);
            append(charaTown, charaTownIcon);
            append(charaTown, charaTownName);
            append(charaInfo, charaDeity);
            append(charaDeity, charaDeityIcon);
            append(charaDeity, charaDeityName);
            //ClassJobs
            //Crafters
            append(charaARMDiv, charaARM);
            append(charaARMDiv, charaARMLvl);
            append(charaClassJob, charaARMDiv);
            append(charaBSMDiv, charaBSM);
            append(charaBSMDiv, charaBSMLvl);
            append(charaClassJob, charaBSMDiv);
            append(charaGSMDiv, charaGSM);
            append(charaGSMDiv, charaGSMLvl);
            append(charaClassJob, charaGSMDiv);
            append(charaCRPDiv, charaCRP);
            append(charaCRPDiv, charaCRPLvl);
            append(charaClassJob, charaCRPDiv);
            append(charaLTWDiv, charaLTW);
            append(charaLTWDiv, charaLTWLvl);
            append(charaClassJob, charaLTWDiv);
            append(charaWVRDiv, charaWVR);
            append(charaWVRDiv, charaWVRLvl);
            append(charaClassJob, charaWVRDiv);
            append(charaALCDiv, charaALC);
            append(charaALCDiv, charaALCLvl);
            append(charaClassJob, charaALCDiv);
            append(charaCULDiv, charaCUL);
            append(charaCULDiv, charaCULLvl);
            append(charaClassJob, charaCULDiv);
            //Gatherers
            append(charaBTNDiv, charaBTN);
            append(charaBTNDiv, charaBTNLvl);
            append(charaClassJob, charaBTNDiv);
            append(charaMINDiv, charaMIN);
            append(charaMINDiv, charaMINLvl);
            append(charaClassJob, charaMINDiv);
            append(charaFSHDiv, charaFSH);
            append(charaFSHDiv, charaFSHLvl);
            append(charaClassJob, charaFSHDiv);
            //Tanks
            append(charaPLDDiv, charaPLD);
            append(charaPLDDiv, charaPLDLvl);
            append(charaClassJob, charaPLDDiv);
            append(charaWARDiv, charaWAR);
            append(charaWARDiv, charaWARLvl);
            append(charaClassJob, charaWARDiv);
            append(charaDRKDiv, charaDRK);
            append(charaDRKDiv, charaDRKLvl);
            append(charaClassJob, charaDRKDiv);
            append(charaGNBDiv, charaGNB);
            append(charaGNBDiv, charaGNBLvl);
            append(charaClassJob, charaGNBDiv);
            //Healers
            append(charaWHMDiv, charaWHM);
            append(charaWHMDiv, charaWHMLvl);
            append(charaClassJob, charaWHMDiv);
            append(charaSCHDiv, charaSCH);
            append(charaSCHDiv, charaSCHLvl);
            append(charaClassJob, charaSCHDiv);
            append(charaASTDiv, charaAST);
            append(charaASTDiv, charaASTLvl);
            append(charaClassJob, charaASTDiv);
            //Melee
            append(charaMNKDiv, charaMNK);
            append(charaMNKDiv, charaMNKLvl);
            append(charaClassJob, charaMNKDiv);
            append(charaDRGDiv, charaDRG);
            append(charaDRGDiv, charaDRGLvl);
            append(charaClassJob, charaDRGDiv);
            append(charaNINDiv, charaNIN);
            append(charaNINDiv, charaNINLvl);
            append(charaClassJob, charaNINDiv);
            append(charaSAMDiv, charaSAM);
            append(charaSAMDiv, charaSAMLvl);
            append(charaClassJob, charaSAMDiv);
            //Ranged
            append(charaBRDDiv, charaBRD);
            append(charaBRDDiv, charaBRDLvl);
            append(charaClassJob, charaBRDDiv);
            append(charaMCHDiv, charaMCH);
            append(charaMCHDiv, charaMCHLvl);
            append(charaClassJob, charaMCHDiv);
            append(charaDNCDiv, charaDNC);
            append(charaDNCDiv, charaDNCLvl);
            append(charaClassJob, charaDNCDiv);
            //Casters
            append(charaBLMDiv, charaBLM);
            append(charaBLMDiv, charaBLMLvl);
            append(charaClassJob, charaBLMDiv);
            append(charaSMNDiv, charaSMN);
            append(charaSMNDiv, charaSMNLvl);
            append(charaClassJob, charaSMNDiv);
            append(charaRDMDiv, charaRDM);
            append(charaRDMDiv, charaRDMLvl);
            append(charaClassJob, charaRDMDiv);
            //Limited
            append(charaBLUDiv, charaBLU);
            append(charaBLUDiv, charaBLULvl);
            append(charaClassJob, charaBLUDiv);
          });
      });
    });
}