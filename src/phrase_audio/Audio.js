import React, { useEffect, useRef, useState } from "react";
import { Layout, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, Select, notification } from "antd";
import { supabase } from "../supabaseClient.js";
import Pagefooter from "../component/Pagefooter";

const Audio = () => {
  const [songs, setSongs] = useState(songsdata);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(songsdata[0]);

  const audioElem = useRef();

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    } else {
      audioElem.current.pause();
    }
  }, [isplaying]);
};
