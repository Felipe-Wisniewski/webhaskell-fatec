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

-- buscar usuario pelo id ---------------------------------------
getUsuarioIdR :: UsuarioId -> Handler Value
getUsuarioIdR uid = do
    addHeader "Access-Control-Allow-Origin" "*"
    usuario <- runDB $ get404 uid
    sendStatusJSON ok200 (object ["resp" .= usuario])

-- buscar usuario pelo email ----------------------------------
getUsuarioEmailR :: Text -> Handler Value
getUsuarioEmailR email = do
    addHeader "Access-Control-Allow-Origin" "*"
    usuario <- runDB $ getBy $ UniqueEmail email
    sendStatusJSON ok200 (object ["resp" .= usuario])
       

-- login -------------------------------------------------------
postUsuarioLoginR :: Handler Value
postUsuarioLoginR = do
    addHeader "Access-Control-Allow-Origin" "*"
    (e,p) <- requireJsonBody :: Handler (Text,Text)
    usuario <- runDB $ selectList [UsuarioEmail ==. e, UsuarioPassword ==. p] []
    sendStatusJSON ok200 (object ["resp" .= usuario])