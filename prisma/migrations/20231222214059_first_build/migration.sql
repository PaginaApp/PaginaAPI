-- CreateTable
CREATE TABLE "User" (
    "usu_Id" TEXT NOT NULL,
    "usu_Nome" TEXT NOT NULL,
    "usu_Email" TEXT NOT NULL,
    "usu_Senha" TEXT NOT NULL,
    "usu_Telefone" CHAR(16) NOT NULL,
    "usu_CPF" CHAR(11) NOT NULL,
    "usu_Nasc" DATE NOT NULL,
    "usu_Privacidade" BOOLEAN NOT NULL DEFAULT false,
    "usu_Uso" BOOLEAN NOT NULL DEFAULT false,
    "usu_avatar" TEXT NOT NULL,
    "usu_pap_id" TEXT NOT NULL,
    "usu_Rua" TEXT NOT NULL,
    "usu_Numero" TEXT NOT NULL,
    "usu_Bairro" TEXT NOT NULL,
    "usu_CEP" CHAR(16) NOT NULL,
    "usu_Complemento" TEXT NOT NULL,
    "usu_est_id" TEXT NOT NULL,
    "usu_cid_id" TEXT NOT NULL,
    "usu_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usu_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("usu_Id")
);

-- CreateTable
CREATE TABLE "Estado" (
    "est_Id" TEXT NOT NULL,
    "est_Nome" TEXT NOT NULL,
    "est_UF" CHAR(2) NOT NULL,
    "est_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "est_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estado_pkey" PRIMARY KEY ("est_Id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "cid_Id" TEXT NOT NULL,
    "cid_Nome" TEXT NOT NULL,
    "cid_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cid_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("cid_Id")
);

-- CreateTable
CREATE TABLE "Papel" (
    "pap_Id" TEXT NOT NULL,
    "pap_Nome" TEXT NOT NULL,
    "pap_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pap_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Papel_pkey" PRIMARY KEY ("pap_Id")
);

-- CreateTable
CREATE TABLE "Termo_privacidade" (
    "tpr_Id" TEXT NOT NULL,
    "tpr_Texto" TEXT NOT NULL,
    "tpr_usu_id" TEXT NOT NULL,
    "tpr_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tpr_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Termo_privacidade_pkey" PRIMARY KEY ("tpr_Id")
);

-- CreateTable
CREATE TABLE "Termo_uso" (
    "tus_Id" TEXT NOT NULL,
    "tus_Texto" TEXT NOT NULL,
    "tus_usu_id" TEXT NOT NULL,
    "tus_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tus_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Termo_uso_pkey" PRIMARY KEY ("tus_Id")
);

-- CreateTable
CREATE TABLE "Livro" (
    "liv_Id" TEXT NOT NULL,
    "liv_Titulo" TEXT NOT NULL,
    "liv_Ano" CHAR(4) NOT NULL,
    "liv_Sinopse" TEXT NOT NULL,
    "liv_edi_id" TEXT NOT NULL,
    "liv_aut_id" TEXT NOT NULL,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("liv_Id")
);

-- CreateTable
CREATE TABLE "Editora" (
    "edi_Id" TEXT NOT NULL,
    "edi_Nome" TEXT NOT NULL,
    "edi_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edi_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Editora_pkey" PRIMARY KEY ("edi_Id")
);

-- CreateTable
CREATE TABLE "Autor" (
    "aut_Id" TEXT NOT NULL,
    "aut_Nome" TEXT NOT NULL,
    "aut_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aut_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("aut_Id")
);

-- CreateTable
CREATE TABLE "Categoria_Livro" (
    "liv_id" TEXT NOT NULL,
    "cat_id" TEXT NOT NULL,
    "cat_liv_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cat_liv_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_Livro_pkey" PRIMARY KEY ("liv_id","cat_id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "cat_Id" TEXT NOT NULL,
    "cat_Nome" TEXT NOT NULL,
    "cat_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cat_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("cat_Id")
);

-- CreateTable
CREATE TABLE "Lista_De_Desejos" (
    "usu_id" TEXT NOT NULL,
    "liv_id" TEXT NOT NULL,
    "ldd_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ldd_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lista_De_Desejos_pkey" PRIMARY KEY ("usu_id","liv_id")
);

-- CreateTable
CREATE TABLE "Exemplar" (
    "exe_Id" TEXT NOT NULL,
    "exe_Descricao" TEXT NOT NULL,
    "exe_Negociando" BOOLEAN NOT NULL DEFAULT false,
    "exe_liv_id" TEXT NOT NULL,
    "exe_usu_id" TEXT NOT NULL,
    "exe_epg_id" TEXT NOT NULL,
    "exe_ecp_id" TEXT NOT NULL,
    "exe_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exe_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exemplar_pkey" PRIMARY KEY ("exe_Id")
);

-- CreateTable
CREATE TABLE "Estado_Paginas" (
    "epg_Id" TEXT NOT NULL,
    "epg_Nome" TEXT NOT NULL,
    "epg_Descricao" TEXT NOT NULL,
    "epg_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "epg_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estado_Paginas_pkey" PRIMARY KEY ("epg_Id")
);

-- CreateTable
CREATE TABLE "Estado_Capa" (
    "ecp_Id" TEXT NOT NULL,
    "ecp_Nome" TEXT NOT NULL,
    "ecp_Descricao" TEXT NOT NULL,
    "ecp_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ecp_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Estado_Capa_pkey" PRIMARY KEY ("ecp_Id")
);

-- CreateTable
CREATE TABLE "Imagem_Exemplar" (
    "iex_Id" TEXT NOT NULL,
    "iex_Path" TEXT NOT NULL,
    "iex_exe_id" TEXT NOT NULL,
    "iex_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "iex_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Imagem_Exemplar_pkey" PRIMARY KEY ("iex_Id")
);

-- CreateTable
CREATE TABLE "Transacao_Aceita" (
    "ttr_Id" TEXT NOT NULL,
    "exe_Id" TEXT NOT NULL,

    CONSTRAINT "Transacao_Aceita_pkey" PRIMARY KEY ("ttr_Id","exe_Id")
);

-- CreateTable
CREATE TABLE "Transacao" (
    "trs_Id" TEXT NOT NULL,
    "trs_Data" TIMESTAMP(3) NOT NULL,
    "trs_Preco" DECIMAL(10,2) NOT NULL,
    "trs_Prazo" INTEGER NOT NULL,
    "trs_ttr_id" TEXT NOT NULL,
    "trs_str_id" TEXT NOT NULL,
    "trs_usu_Leitor_id" TEXT NOT NULL,
    "trs_usu_Anunciante_id" TEXT NOT NULL,
    "trs_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trs_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transacao_pkey" PRIMARY KEY ("trs_Id")
);

-- CreateTable
CREATE TABLE "Tipo_Transacao" (
    "ttr_Id" TEXT NOT NULL,
    "ttr_Nome" TEXT NOT NULL,
    "ttr_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ttr_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tipo_Transacao_pkey" PRIMARY KEY ("ttr_Id")
);

-- CreateTable
CREATE TABLE "Exemplar_Transacao" (
    "trs_id" TEXT NOT NULL,
    "exe_id" TEXT NOT NULL,

    CONSTRAINT "Exemplar_Transacao_pkey" PRIMARY KEY ("trs_id","exe_id")
);

-- CreateTable
CREATE TABLE "Status_Transacao" (
    "str_Id" TEXT NOT NULL,
    "str_Nome" TEXT NOT NULL,
    "str_CriadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "str_AtualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Status_Transacao_pkey" PRIMARY KEY ("str_Id")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "ava_Id" TEXT NOT NULL,
    "ava_Pontuacao" INTEGER NOT NULL,
    "ava_trs_id" TEXT NOT NULL,
    "ava_usu_avaliador_id" TEXT NOT NULL,
    "ava_usu_avaliado_id" TEXT NOT NULL,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("ava_Id")
);

-- CreateTable
CREATE TABLE "Titulos" (
    "tit_Id" TEXT NOT NULL,
    "tit_Nome" TEXT NOT NULL,
    "tit_Pontuacao" INTEGER NOT NULL,
    "tit_ttr_Id" TEXT NOT NULL,

    CONSTRAINT "Titulos_pkey" PRIMARY KEY ("tit_Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_usu_Email_key" ON "User"("usu_Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_usu_CPF_key" ON "User"("usu_CPF");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_usu_pap_id_fkey" FOREIGN KEY ("usu_pap_id") REFERENCES "Papel"("pap_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_usu_est_id_fkey" FOREIGN KEY ("usu_est_id") REFERENCES "Estado"("est_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_usu_cid_id_fkey" FOREIGN KEY ("usu_cid_id") REFERENCES "Cidade"("cid_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Termo_privacidade" ADD CONSTRAINT "Termo_privacidade_tpr_usu_id_fkey" FOREIGN KEY ("tpr_usu_id") REFERENCES "User"("usu_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Termo_uso" ADD CONSTRAINT "Termo_uso_tus_usu_id_fkey" FOREIGN KEY ("tus_usu_id") REFERENCES "User"("usu_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_liv_edi_id_fkey" FOREIGN KEY ("liv_edi_id") REFERENCES "Editora"("edi_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_liv_aut_id_fkey" FOREIGN KEY ("liv_aut_id") REFERENCES "Autor"("aut_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria_Livro" ADD CONSTRAINT "Categoria_Livro_liv_id_fkey" FOREIGN KEY ("liv_id") REFERENCES "Livro"("liv_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Categoria_Livro" ADD CONSTRAINT "Categoria_Livro_cat_id_fkey" FOREIGN KEY ("cat_id") REFERENCES "Categoria"("cat_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista_De_Desejos" ADD CONSTRAINT "Lista_De_Desejos_usu_id_fkey" FOREIGN KEY ("usu_id") REFERENCES "User"("usu_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lista_De_Desejos" ADD CONSTRAINT "Lista_De_Desejos_liv_id_fkey" FOREIGN KEY ("liv_id") REFERENCES "Livro"("liv_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exemplar" ADD CONSTRAINT "Exemplar_exe_liv_id_fkey" FOREIGN KEY ("exe_liv_id") REFERENCES "Livro"("liv_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exemplar" ADD CONSTRAINT "Exemplar_exe_usu_id_fkey" FOREIGN KEY ("exe_usu_id") REFERENCES "User"("usu_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exemplar" ADD CONSTRAINT "Exemplar_exe_epg_id_fkey" FOREIGN KEY ("exe_epg_id") REFERENCES "Estado_Paginas"("epg_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exemplar" ADD CONSTRAINT "Exemplar_exe_ecp_id_fkey" FOREIGN KEY ("exe_ecp_id") REFERENCES "Estado_Capa"("ecp_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem_Exemplar" ADD CONSTRAINT "Imagem_Exemplar_iex_exe_id_fkey" FOREIGN KEY ("iex_exe_id") REFERENCES "Exemplar"("exe_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao_Aceita" ADD CONSTRAINT "Transacao_Aceita_ttr_Id_fkey" FOREIGN KEY ("ttr_Id") REFERENCES "Tipo_Transacao"("ttr_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao_Aceita" ADD CONSTRAINT "Transacao_Aceita_exe_Id_fkey" FOREIGN KEY ("exe_Id") REFERENCES "Exemplar"("exe_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_trs_ttr_id_fkey" FOREIGN KEY ("trs_ttr_id") REFERENCES "Tipo_Transacao"("ttr_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_trs_str_id_fkey" FOREIGN KEY ("trs_str_id") REFERENCES "Status_Transacao"("str_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_trs_usu_Leitor_id_fkey" FOREIGN KEY ("trs_usu_Leitor_id") REFERENCES "User"("usu_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transacao" ADD CONSTRAINT "Transacao_trs_usu_Anunciante_id_fkey" FOREIGN KEY ("trs_usu_Anunciante_id") REFERENCES "User"("usu_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exemplar_Transacao" ADD CONSTRAINT "Exemplar_Transacao_trs_id_fkey" FOREIGN KEY ("trs_id") REFERENCES "Transacao"("trs_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exemplar_Transacao" ADD CONSTRAINT "Exemplar_Transacao_exe_id_fkey" FOREIGN KEY ("exe_id") REFERENCES "Exemplar"("exe_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_ava_trs_id_fkey" FOREIGN KEY ("ava_trs_id") REFERENCES "Transacao"("trs_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_ava_usu_avaliador_id_fkey" FOREIGN KEY ("ava_usu_avaliador_id") REFERENCES "User"("usu_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_ava_usu_avaliado_id_fkey" FOREIGN KEY ("ava_usu_avaliado_id") REFERENCES "User"("usu_Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Titulos" ADD CONSTRAINT "Titulos_tit_ttr_Id_fkey" FOREIGN KEY ("tit_ttr_Id") REFERENCES "Tipo_Transacao"("ttr_Id") ON DELETE RESTRICT ON UPDATE CASCADE;
