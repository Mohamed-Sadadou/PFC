
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import SignInSide from './component/login-page/SigneInSide';
import MainAdminPage from './component/admin-page/adminPage';
import MainEnseignantPage from './component/Enseignant-page/EnseignantPage';
import MainEtudiantPage from './component/Etudiant-page/Etudiantpage';
import MainBinomePage from './component/Binome-page/binomePage';
import MainJuryPage from './component/Jury-page/JuryPage';
import MainResponsable from './component/Responsable-page/ResponsablePage';
import MainCommission from './component/commission-page/Commissionpage';
import PostulatPage from './component/Binome-page/Postulat';
import CreateCommission from './component/Responsable-page/formCommission';
import VisualiserFiches from './component/Jury-page/VisualiserFicheEvaluation';
import AjoutFicheEvaluation from './component/Jury-page/formFicheEvaluation';
import Validation from './component/commission-page/Validation';
import FicheValidation from './component/commission-page/formFicheValidation';
import CreateEtd from './component/admin-page/formEtd';
import CreateEns from './component/admin-page/formEns';
import CreateResp from './component/admin-page/formResSpec';
import CreateJury from './component/admin-page/formMemJury';
import CreateBinome from './component/Etudiant-page/formBinome';
import AjouSujetExterne from './component/admin-page/SujetExterne';
import AjoutSujetInterne from './component/Enseignant-page/SujetInterne';
import AffectationBinome from './component/Enseignant-page/Affectation';
import ModifierSujet from './component/Enseignant-page/ModifierSujet'
import VisualiserSjt from './component/admin-page/VisualiserSjt';
import TableauDeBord from './component/admin-page/TableauDeBord';
import AfficheEtudiant from './component/admin-page/AfficheEtudiants'
import AfficherEnseignant from './component/admin-page/AfficheEnseignant'
import AfficherBinomes from './component/admin-page/AfficheBinome'
import Profil from './component/Profil-Page/ProfilPage';
import VisualiserSjtD from './component/commission-page/VisualiseSujet'
//import deconnection from './component/admin-page/deconnection';
import { UidContext, RoleUContext, UIDFContext, UserNameContext, EnsRolesConext } from './component/AppContexte';
import { React, useEffect, useState } from 'react';
import axios from 'axios';


function App() {

  const [uid, setUid] = useState(null);
  const [Role, setRole] = useState(null);
  const [IDF, setIDF] = useState(null);
  const [UserName, SetUserName] = useState(null);
  const [Roles, SetRoles] = useState([]);

  useEffect(() => {
   
    const GetInfo = async () => {
      /*console.log('on get les info')*/
      await axios({
        method: "get",
        url: "http://localhost:5000/Utilisateur/chektout",
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.status)
          if (res.status == (201)) { if( window.location.href !="http://localhost:3000/seConnecter") window.location.href ="/seConnecter" }
          if (res.status == (200)) { setUid(res.data.id); setRole(res.data.role); setIDF(res.data.IDF); SetUserName(res.data.UserName); SetRoles(res.data.Roles);
          }
          })
        .catch((err) => { console.log('thardet', err);  })
    }
    
    GetInfo();

  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <RoleUContext.Provider value={Role}>
        <UIDFContext.Provider value={IDF}>
          <UserNameContext.Provider value={UserName}>
            <EnsRolesConext.Provider value={Roles}>
              <Router>
                <div className="App">

                  <div className="principal">
                    <Switch>
                      <Route exact path="/seConnecter">
                        <SignInSide />
                      </Route>
                      <Route path="/admin-page">
                        <MainAdminPage />
                      </Route>
                      <Route path='/CreateEtd'>
                        <CreateEtd />
                      </Route>
                      <Route path='/CreateEns'>
                        <CreateEns />
                      </Route>
                      <Route path='/DesigneResponsableSpecialite'>
                        <CreateResp />
                      </Route>
                      <Route path='/DesigneMembreJury'>
                        <CreateJury />
                      </Route>
                      <Route path='/AjouterSujetExterne'>
                        <AjouSujetExterne />
                      </Route>
                      <Route path='/VisualiserSujet'>
                        <VisualiserSjt />
                      </Route>
                      <Route path='/Profil'>
                        <Profil />
                      </Route>

                      <Route path="/Enseignant-page">
                        <MainEnseignantPage />
                      </Route>
                      <Route path='/AjouterSujetInterne'>
                        <AjoutSujetInterne />
                      </Route>
                      <Route path='/AffecterBinome'>
                        <AffectationBinome />
                      </Route>

                      <Route path='/Etudiant-page'>
                        <MainEtudiantPage />
                      </Route>

                      <Route path='/CreationBinomePage'>
                        <CreateBinome />
                      </Route>

                      <Route path='/Binome-page'>
                        <MainBinomePage />
                      </Route>

                      <Route path='/PostuleSujet'>
                        <PostulatPage />
                      </Route>

                      <Route path='/PageResponsable'>
                        <MainResponsable />
                      </Route>

                      <Route path='/PageJury'>
                        <MainJuryPage />
                      </Route>

                      <Route path='/PageCommission'>
                        <MainCommission />
                      </Route>

                      <Route path='/CreateCommission'>
                        <CreateCommission />
                      </Route>

                      <Route path='/VisualiserFiches'>
                        <VisualiserFiches />
                      </Route>

                      <Route path='/AjouterFicheEvaluation'>
                        <AjoutFicheEvaluation />
                      </Route>

                      <Route path='/ValiderSujet'>
                        <Validation />
                      </Route>

                      <Route path='/RemplirFicheValidation'>
                        <FicheValidation />
                      </Route>

                      <Route path='/ModifierSujet/:code'>
                        <ModifierSujet />
                      </Route>

                      <Route path='/TableauDeBord'>
                        <TableauDeBord />
                      </Route>

                      <Route path='/AfficherEtudiant'>
                        <AfficheEtudiant />
                      </Route>

                      <Route path='/AfficherEnseignant'>
                        <AfficherEnseignant />
                      </Route>

                      <Route path='/AfficherBinomes'>
                        <AfficherBinomes />
                      </Route>

                      <Route path='/VisualiserSjtD'>
                        <VisualiserSjtD />
                      </Route>


                      <Redirect to="/seConnecter" />
                    </Switch>
                  </div>
                </div>
              </Router>
            </EnsRolesConext.Provider>
          </UserNameContext.Provider>
        </UIDFContext.Provider>
      </RoleUContext.Provider>
    </UidContext.Provider>
  );
}

export default App;
