const mysql_config = {
    host: "localhost",
    user: "root",
    password: "bilkent",
    database: "bilkent"
}

const mysql_table_names = {
    user_table: "User",
    citizen_table: "Citizen",
    court_table: "Court",
    conciliator_table: "Conciliator",
    lawyer_table: "Lawyer",
    lawsuit_table: "Lawsuit",
    judge_table: "Judge",
    payment_table: "Payment",
    trial_table: "Trial",
    personalStatement_table: "Personal_Statement"
}

const mysql_info_tables = {
    citizen: "INFO_ABOUT_CITIZEN",
    lawyer: "INFO_ABOUT_LAWYER",
    judge: "INFO_ABOUT_JUDGE",
    conciliator: "INFO_ABOUT_CONCILIATOR",
    citizen_lawsuit: "INFO_ABOUT_CITIZEN_AND_LAWSUIT",
    lawsuit_conciliator: "INFO_ABOUT_LAWSUIT_THAT_HAS_CONCILIATOR",
    citizenLawsuitFile: "Citizen_Lawsuit_File",
    citizenLawyerWorksFor: "Citizen_Lawyer_Work_For",
    lawyerLawsuit: "Lawyer_Lawsuit_Of",
    judgeLawsuit: "Judge_Lawsuit_Assigned",
    judgeConciliatorLawsuit: "Judge_Conciliator_Lawsuit_Assign",
    reconciliation: "Citizen_Lawsuit_Reconciliation"
}

module.exports = { mysql_config, mysql_table_names, mysql_info_tables };