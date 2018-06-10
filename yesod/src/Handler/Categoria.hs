{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TypeFamilies #-}
module Handler.Categoria where

import Import
import Network.HTTP.Types.Status
import Database.Persist.Postgresql

-- buscar todas as categorias -------------------------------
getCategoriaR :: Handler Value
getCategoriaR = do
    addHeader "Access-Control-Allow-Origin" "*"
    todasCategorias <- runDB $ selectList [] [Asc CategoriaTipo]
    sendStatusJSON ok200 (object ["resp" .= todasCategorias]) 

-- salvar categoria -----------------------------------------
postCategoriaR :: Handler Value
postCategoriaR = do
    addHeader "Access-Control-Allow-Origin" "*"
    categoria <- requireJsonBody :: Handler Categoria
    cid <- runDB $ insert categoria
    sendStatusJSON created201 (object ["resp" .= fromSqlKey cid])