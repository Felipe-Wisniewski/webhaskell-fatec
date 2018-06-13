{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TypeFamilies #-}
module Handler.Curtida where

import Import
import Network.HTTP.Types.Status
import Database.Persist.Postgresql

-- buscar todas as curtidas
getCurtidaR :: Handler Value
getCurtidaR = do
    addHeader "Access-Control-Allow-Origin" "*"
    todasCurtidas <- runDB $ selectList [] [Asc CurtidaId]
    sendStatusJSON ok200 (object ["resp" .= todasCurtidas])

-- salvar curtida
postCurtidaR :: Handler Value
postCurtidaR = do
    addHeader "Access-Control-Allow-Origin" "*"
    curtida <- requireJsonBody :: Handler Curtida
    cid <- runDB $ insert curtida
    sendStatusJSON created201 (object ["resp" .= fromSqlKey cid])

-- buscar curtida pelo id ---------------------------------------
getCurtidaIdR :: CurtidaId -> Handler Value
getCurtidaIdR cid = do
    addHeader "Access-Control-Allow-Origin" "*"
    _ <- runDB $ get404 cid
    curtida <- runDB $ selectList [CurtidaId ==. cid] []
    sendStatusJSON ok200 (object ["resp" .= curtida])