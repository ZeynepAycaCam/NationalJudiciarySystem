import store from "@/store";
import { makeRequest } from './utils';

function login(type, username, password) {
    return makeRequest('post', '/session/login/' + type, {
        username,
        password
    });
}

function logout() {
    return makeRequest('post', '/session/logout');
}

function register(credentials) {

    const { type, courtID, TCKno, firstName, lastName, dateOfBirth, phoneNumber, e_mail, addressStreet, addressApartment, addressZip, addressCity, password } = credentials;
    var address = addressStreet + addressApartment + addressZip + addressCity;
    var name = firstName + " " + lastName;

    return makeRequest('post', '/registration', {
        type, courtID, TCKno, name, dateOfBirth, phoneNumber, e_mail, address, password
    });
}

function fileLawsuit(credentials) {
    const { courtID, forWhom, lawyer, claim, client } = credentials;
    const { user } = store.getState();
    const citizenID = user.citizenID || null;
    return makeRequest('post', '/fileLawsuit', {
        courtID, forWhom, lawyer: lawyer || user.barID, claim, citizenID, client
    });
}

function payment(userID) {
    return makeRequest('get', '/payment/' + userID);
}

function displayLawsuits() {
    const { user, userType } = store.getState();
    const userID = user.citizenID || user.barID;
    return makeRequest('get', '/displayLawsuit/type/' + userType + '/' + userID);
}

function detailLawsuit(lawsuitID) {
    const { user, userType } = store.getState();
    const userID = user.citizenID || user.barID;
    return makeRequest('get', '/displayLawsuit/detail/' + userType + '/' + userID + '/' + lawsuitID);
}

function getCourts() {
    return makeRequest('get', '/data/court/all');
}

function getLawyers() {
    return makeRequest('get', '/data/lawyer/all');
}

function getConciliators() {
    return makeRequest('get', '/data/conciliator/all');
}

function getCourt(courtID) {
    return makeRequest('get', '/data/court/' + courtID);
}

function getLawyer(citizenID) {
    return makeRequest('get', '/data/lawyer/' + citizenID);
}

function getLawyersViaLawsuitID(lawsuitID) {
    return makeRequest('get', '/data/lawyer/lawsuit/' + lawsuitID);
}

function getConciliator(lawsuitID) {
    return makeRequest('get', '/data/conciliator/' + lawsuitID);
}

function getTrials(lawsuitID) {
    return makeRequest('get', '/displayLawsuit/trials/' + lawsuitID);
}

function getTrial(lawsuitID, trialNumber) {
    return makeRequest('get', '/displayLawsuit/trials/' + lawsuitID + '/' + trialNumber);
}

function getPersonalStatements(lawsuitID, trialNumber) {
    return makeRequest('get', '/personalStatement/' + lawsuitID + '/' + trialNumber);
}

function getPersonalStatement(lawsuitID, trialNumber, citizenID) {
    return makeRequest('get', '/personalStatement/' + lawsuitID + '/' + trialNumber + '/' + citizenID);
}

function hireLawyer(barID) {
    const { user } = store.getState();
    const citizenID = user.citizenID;

    return makeRequest('post', '/data/hireLawyer/' + citizenID, {
        barID
    });
}

function finalize(lawsuitID, decision, barID) {
    return makeRequest('post', '/data/lawsuit/finalize/' + lawsuitID, {
        decision, barID
    });
}

function assignConciliator(lawsuitID, conciliatorID) {
    const { user } = store.getState();
    const barID = user.barID;

    return makeRequest('post', '/data/lawsuit/assign/' + lawsuitID, {
        barID, conciliatorID
    });
}

function postpone(lawsuitID, date) {
    return makeRequest('post', '/data/lawsuit/postpone/' + lawsuitID, {
        date
    });
}

function getReconcilation(lawsuitID) {
    return makeRequest('get', '/data/reconciliation/' + lawsuitID);
}

function finalizeReconcilation(lawsuitID) {
    return makeRequest('post', '/data/reconciliation/' + lawsuitID);
}

export {
    login,
    logout,
    register,
    fileLawsuit,
    payment,
    displayLawsuits,
    detailLawsuit,
    getCourts,
    getCourt,
    getTrials,
    getTrial,
    getPersonalStatements,
    getPersonalStatement,
    getLawyers,
    getLawyer,
    getConciliators,
    getConciliator,
    hireLawyer,
    getLawyersViaLawsuitID,
    finalize,
    assignConciliator,
    postpone,
    getReconcilation,
    finalizeReconcilation
}