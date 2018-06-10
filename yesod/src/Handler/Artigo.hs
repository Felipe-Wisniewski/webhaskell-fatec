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