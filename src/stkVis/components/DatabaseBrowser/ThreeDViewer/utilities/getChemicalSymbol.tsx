import {
    Maybe,
    Just,
    Nothing,
} from '../../../../utilities';
import * as md from 'mol-draw';


export function getChemicalSymbol(atomicNumber: number): Maybe<any>
{
    switch (atomicNumber)
    {
        case 1:
            return new Just(md.h);
        case 2:
            return new Just(md.he);
        case 3:
            return new Just(md.li);
        case 4:
            return new Just(md.be);
        case 5:
            return new Just(md.b);
        case 6:
            return new Just(md.c);
        case 7:
            return new Just(md.n);
        case 8:
            return new Just(md.o);
        case 9:
            return new Just(md.f);
        case 10:
            return new Just(md.ne);
        case 11:
            return new Just(md.na);
        case 12:
            return new Just(md.mg);
        case 13:
            return new Just(md.al);
        case 14:
            return new Just(md.si);
        case 15:
            return new Just(md.p);
        case 16:
            return new Just(md.s);
        case 17:
            return new Just(md.cl);
        case 18:
            return new Just(md.ar);
        case 19:
            return new Just(md.k);
        case 20:
            return new Just(md.ca);
        case 21:
            return new Just(md.sc);
        case 22:
            return new Just(md.ti);
        case 23:
            return new Just(md.v);
        case 24:
            return new Just(md.cr);
        case 25:
            return new Just(md.mn);
        case 26:
            return new Just(md.fe);
        case 27:
            return new Just(md.co);
        case 28:
            return new Just(md.ni);
        case 29:
            return new Just(md.cu);
        case 30:
            return new Just(md.zn);
        case 31:
            return new Just(md.ga);
        case 32:
            return new Just(md.ge);
        case 33:
            return new Just(md.as);
        case 34:
            return new Just(md.se);
        case 35:
            return new Just(md.br);
        case 36:
            return new Just(md.kr);
        case 37:
            return new Just(md.rb);
        case 38:
            return new Just(md.sr);
        case 39:
            return new Just(md.y);
        case 40:
            return new Just(md.zr);
        case 41:
            return new Just(md.nb);
        case 42:
            return new Just(md.mo);
        case 43:
            return new Just(md.tc);
        case 44:
            return new Just(md.ru);
        case 45:
            return new Just(md.rh);
        case 46:
            return new Just(md.pd);
        case 47:
            return new Just(md.ag);
        case 48:
            return new Just(md.cd);
        case 49:
            return new Just(md.in_);
        case 50:
            return new Just(md.sn);
        case 51:
            return new Just(md.sb);
        case 52:
            return new Just(md.te);
        case 53:
            return new Just(md.i);
        case 54:
            return new Just(md.xe);
        case 55:
            return new Just(md.cs);
        case 56:
            return new Just(md.ba);
        case 57:
            return new Just(md.la);
        case 58:
            return new Just(md.ce);
        case 59:
            return new Just(md.pr);
        case 60:
            return new Just(md.nd);
        case 61:
            return new Just(md.pm);
        case 62:
            return new Just(md.sm);
        case 63:
            return new Just(md.eu);
        case 64:
            return new Just(md.gd);
        case 65:
            return new Just(md.tb);
        case 66:
            return new Just(md.dy);
        case 67:
            return new Just(md.ho);
        case 68:
            return new Just(md.er);
        case 69:
            return new Just(md.tm);
        case 70:
            return new Just(md.yb);
        case 71:
            return new Just(md.lu);
        case 72:
            return new Just(md.hf);
        case 73:
            return new Just(md.ta);
        case 74:
            return new Just(md.w);
        case 75:
            return new Just(md.re);
        case 76:
            return new Just(md.os);
        case 77:
            return new Just(md.ir);
        case 78:
            return new Just(md.pt);
        case 79:
            return new Just(md.au);
        case 80:
            return new Just(md.hg);
        case 81:
            return new Just(md.tl);
        case 82:
            return new Just(md.pb);
        case 83:
            return new Just(md.bi);
        case 84:
            return new Just(md.po);
        case 85:
            return new Just(md.at);
        case 86:
            return new Just(md.rn);
        case 87:
            return new Just(md.rf);
        case 88:
            return new Just(md.ra);
        case 89:
            return new Just(md.ac);
        case 90:
            return new Just(md.th);
        case 91:
            return new Just(md.pa);
        case 92:
            return new Just(md.u);
        case 93:
            return new Just(md.np);
        case 94:
            return new Just(md.pu);
        case 95:
            return new Just(md.am);
        case 96:
            return new Just(md.cm);
        case 97:
            return new Just(md.bk);
        case 98:
            return new Just(md.cf);
        case 99:
            return new Just(md.es);
        case 100:
            return new Just(md.fm);
        case 101:
            return new Just(md.md);
        case 102:
            return new Just(md.no);
        case 103:
            return new Just(md.lr);
        case 104:
            return new Just(md.rf);
        case 105:
            return new Just(md.db);
        case 106:
            return new Just(md.sg);
        case 107:
            return new Just(md.bh);
        case 108:
            return new Just(md.hs);
        case 109:
            return new Just(md.mt);
        case 110:
            return new Just(md.ds);
        case 111:
            return new Just(md.rg);
        case 112:
            return new Just(md.cn);
        case 113:
            return new Just(md.rh);
        case 114:
            return new Just(md.fl);
        case 115:
            return new Just(md.mc);
        case 116:
            return new Just(md.lv);
        case 117:
            return new Just(md.ts);
        case 118:
            return new Just(md.og);
        default:
            return new Nothing();
    }
}
