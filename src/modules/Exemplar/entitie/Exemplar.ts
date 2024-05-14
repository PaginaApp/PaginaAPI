import { Decimal } from '@prisma/client/runtime/library';

class Exemplar {
  exe_Id: string;

  exe_Descricao: string;

  exe_Negociando: boolean;

  exe_liv_id: string;

  exe_usu_id: string;

  exe_epg_id: string;

  exe_ecp_id: string;

  exe_Prazo: number | null;

  exe_Preco: Decimal | null;

  exe_CriadoEm: Date;

  exe_AtualizadoEm: Date;
}

export { Exemplar };
