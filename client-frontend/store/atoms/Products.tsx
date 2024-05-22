import {atom} from "recoil"

export const titleAtom = atom({
    key: "titleatom",
    default : ""
})

export const descriptionAtom = atom({
    key: "descriptionatom",
    default : ""
})

export const priceAtom = atom({
    key: "priceatom",
    default : ""
    
})

export const deadlineAtom = atom({
    key: "deadlineatom",
    default : new Date()
})