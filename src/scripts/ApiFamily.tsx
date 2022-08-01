import { encode } from "base-64";
import FamilySystem from "./family";
import PWAServise from "./PWA";

const keyCodeFamily: string = encode('k3Ra4Q3HAL9MR7SAEPSNGY3mQNWsvWY2pLdLcu5LesH8rx6g2EFsrFAuCxsShbV7');
const urlBase: string = 'https://tecnica-digital.ga';

const Family = new FamilySystem(urlBase, keyCodeFamily);
const PWA = new PWAServise();

export {
    urlBase,
    Family,
    PWA
};