import fetch from 'node-fetch';

const terms = "Thomas Hobbes\nVersailles\nEstates\nJohn Locke\nTrafalgar\nEstates-General\nMontesquieu\nConfederation of the Rhine\nbourgeoisie\nVoltaire\nGerman Confederation\nBastille\nRousseau	Elba\nNational Assembly\nLouis XVI\nWaterloo\nTennis Court Oath\nMarie Antoinette\nSt. Helena\nDeclaration of the Rights of Man\nMaximilien Robespierre\nand of the Citizen\nNapoleon Bonaparte\nCivil Constitution of the Clergy\nAlexander I\nConstitution of 1791\nLouis XVIII\némigré\nKlemens von Metternich\nNational Convention\nGreat Fear\nsans-culottes\nJacobins/Montagnards\nGirondists\nradical\nmoderate\nconservative\nliberal\nreactionary\ncounterrevolution\ndraft/conscription\nReign of Terror\nCommittee of Public Safety\nDirectory\ncoup d’etat\nplebiscite\nContinental System\nConcordat of 1801\nNapoleonic Code\nHundred Days\nabdicate\nCongress of Vienna\nCarlsbad Decree\ncompensation\nlegitimacy\nbalance of power\nQuadruple Alliance\nConcert of Europe\nCarlsbad Decrees\nSatellite";

console.log(terms.split('\n').map(term => fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=description%7Cextracts&exintro=1&explaintext=1&redirects=1&titles=' + term).then(res => res.json()).then(res => `${term}\n${getElement(res, "description")}`)).join('\n'));

const getElement = (obj, element) => {
    for(var k in obj) {
        if(obj[k] instanceof Object) {
            getElement(obj[k], element);
            if (getElement(obj[k], element) !== undefined)return getElement(obj[k], element);
        }
        else if (k === element)return obj[k];
    };
}

export { fetch };