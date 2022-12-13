import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { settingsSlice } from "../store/settings";
import { Switch } from "./ui/Switch";
import { IoMdSettings as SettingsIcon } from "react-icons/io";
import { FaShare as ShareIcon } from "react-icons/fa";
import { useBoardContext } from "./BoardWrapper";
import { Modal } from "./ui/Modal";
import "./SettingsPanel.css";
import { isMobileOrTablet } from "../util";

export const SettingsPanel = (): JSX.Element => {
  const {
    G: { seed },
  } = useBoardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const settings = useAppSelector((s) => s.settings);
  const dispatch = useAppDispatch();

  const onAttackedCellsCheckboxClicked = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    dispatch(settingsSlice.actions.setIsAttackedCellValuesEnabled(checked));
  };

  const share = async () => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("r") === null) {
      // todo: seed needs to be attached to the game so it can be retrieved here
      const urlSeed = seed ?? "testseed";
      url.searchParams.append("r", urlSeed);
    }

    if (isMobileOrTablet() && navigator.canShare?.()) {
      const shareData = {
        title: "Chessweeper",
        text: "Chess X Minesweeper",
        url: url.href,
      };

      await navigator.share(shareData);
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Modal
        title="Share"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div id="settings-panel" className="flex">
        <div id="settings-icons" className="flex hor">
          <SettingsIcon
            id="settings-button"
            className="settings-icon"
            size={25}
            onClick={() => setShowSettings((prev) => !prev)}
          />
          <ShareIcon className="settings-icon" size={20} onClick={share} />
        </div>
        {showSettings && (
          <Switch
            id="setting-attacked-cell-values"
            label="Show Attacked Cells"
            checked={settings.isAttackedCellValuesEnabled}
            onChange={onAttackedCellsCheckboxClicked}
          />
        )}
      </div>
    </>
  );
};
