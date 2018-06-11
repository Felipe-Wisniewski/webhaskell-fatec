{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TypeFamilies #-}
module Handler.Usuario where

import Import
import Network.HTTP.Types.Status
import Database.Persist.Postgresql

-- salvar usuário -----------------------------------------------
postUsuarioR :: Handler Value
postUsuarioR = do
    addHeader "Access-Control-Allow-Origin" "*"
    usuario <- requireJsonBody :: Handler Usuario
    uid <- runDB $ insert usuario
    sendStatusJSON created201 (object ["resp" .= fromSqlKey uid])
    
-- buscar todos os usuários ------------------------------------
getUsuarioR :: Handler Value
getUsuarioR = do
    addHeader "Access-Control-Allow-Origin" "*"
    todosUsuarios <- runDB $ selectList [] [Asc UsuarioNome]
    sendStatusJSON ok200 (object ["resp" .= todosUsuarios])
    