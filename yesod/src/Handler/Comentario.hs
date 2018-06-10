{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TypeFamilies #-}
module Handler.Comentario where

import Import
import Network.HTTP.Types.Status
import Database.Persist.Postgresql

-- buscar todos os comentarios
getComentarioR :: Handler Value
getComentarioR = do
    addHeader "Access-Control-Allow-Origin" "*"
    todosComentarios <- runDB $ selectList [] [Asc ComentarioDatacom]
    sendStatusJSON ok200 (object ["resp" .= todosComentarios])