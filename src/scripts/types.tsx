type TypicalRes = {
    ok?: boolean;
    cause?: string;
    datas?: any;
};
type StudentsData = {
    id: string;
    name: string;
    dni: string;
    curse: string;
    tel: string;
    email: string;
    date: string;
    picture: string;
};
type FamilyDataAssist = {
    id: string;
    date: string;
    hour: string;
    status: string;
    credential: boolean;
};

export type {
    TypicalRes,
    StudentsData,
    FamilyDataAssist
};