{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TypeFamilies #-}
module Handler.Artigo where

import Import
import Network.HTTP.Types.Status
import Database.Persist.Postgresql

-- buscar todos os artigos ------------------------------------
getArtigoR :: Handler Value
getArtigoR = do
    addHeader "Access-Control-Allow-Origin" "*"
    todosArtigos <- runDB $ selectList [] [Asc ArtigoPublicacao]
    sendStatusJSON ok200 (object ["resp" .= todosArtigos])

-- salvar artigo
postArtigoR :: Handler Value
postArtigoR = do
    addHeader "Access-Control-Allow-Origin" "*"
    artigo <- requireJsonBody :: Handler Artigo
    aid <- runDB $ insert artigo
    sendStatusJSON created201 (object ["resp" .= fromSqlKey aid])