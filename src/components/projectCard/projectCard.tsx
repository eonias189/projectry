import { FC } from "react";
import { Project } from "../../types";
import styles from "./projectCard.module.css";
import IconBtn from "../UI/iconBtn";
import DropDown from "../dropDown";
import { cancelIcon, deleteIcon, editIcon, okIcon, openIcon, settingsIcon } from "../UI/icons";
import useEditAble from "../../hooks/useEditable";
import { getDate } from "../../utils/dateUtils";
import { deleteProject, editProject } from "../../manageState/allProjects";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
    const lastEditingDate = new Date(project.lastEditingDate);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [{ name }, editaAbleName, isAditing, startEdit, finishEdit, cancelEdit] = useEditAble({
        name: project.name,
    });
    const openBtn = (
        <IconBtn
            onClick={() => {
                navigate(`/dev/${project.id}`);
            }}
        >
            {openIcon}
        </IconBtn>
    );
    const editBtn = (
        <IconBtn
            onClick={() => {
                startEdit();
            }}
        >
            {editIcon}
        </IconBtn>
    );
    const deleteBtn = (
        <IconBtn
            onClick={async () => {
                if (window.confirm(`Delete ${project.name}?`)) {
                    await deleteProject(dispatch, project.id);
                }
            }}
        >
            {deleteIcon}
        </IconBtn>
    );
    const okBtn = (
        <IconBtn
            onClick={(e) => {
                e.preventDefault();
                const { name: newName } = finishEdit();
                editProject(dispatch, project.id, newName);
            }}
        >
            {okIcon}
        </IconBtn>
    );
    const cancelBtn = (
        <IconBtn
            onClick={() => {
                cancelEdit();
            }}
        >
            {cancelIcon}
        </IconBtn>
    );
    return (
        <div className={styles.card}>
            <div className={styles.infoArea}>
                <div className={styles.name}>{editaAbleName}</div>
                <p className={styles.path}>path: {project.path}</p>
                <p className={styles.date}>last edited: {getDate(lastEditingDate)}</p>
            </div>
            <div className={styles.actionArea}>
                {openBtn}
                <div className={styles.fixer}>
                    <DropDown expandElement={settingsIcon} className={styles.fix}>
                        {isAditing ? (
                            <>
                                {okBtn}
                                {cancelBtn}
                            </>
                        ) : (
                            <>
                                {editBtn}
                                {deleteBtn}
                            </>
                        )}
                    </DropDown>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
