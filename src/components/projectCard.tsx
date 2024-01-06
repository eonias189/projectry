import { FC } from "react";
import { Project } from "../types";
import styles from "./projectCard.module.css";
import Btn from "./UI/btn";
import IconBtn from "./UI/iconBtn";
import DropDown from "./dropDown";

interface ProjectCardProps {
    project: Project;
}

const getDate = (date: Date): string => {
    const now = new Date();
    const dayDelta = (now.getTime() - date.getTime()) / 1000 / 3600 / 24;
    if (dayDelta >= 365) {
        return `${Math.ceil(dayDelta / 365)} years ago`;
    } else if (dayDelta >= 30) {
        return `${Math.ceil(dayDelta / 30.5)} months ago`;
    } else if (now.getDate() !== date.getDate()) {
        return `${Math.ceil(dayDelta)} days ago`;
    } else {
        return "today";
    }
};

const deleteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
    </svg>
);

const openIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
        <path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z" />
    </svg>
);

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
    const lastEditingDate = new Date(project.lastEditingDate);
    return (
        <div className={styles.card}>
            <div className={styles.infoArea}>
                <p className={styles.name}>Name: {project.name}</p>
                <p className={styles.path}>path: {project.path}</p>
                <p className={styles.date}>last edited: {getDate(lastEditingDate)}</p>
            </div>
            <div className={styles.actionArea}>
                <DropDown className={styles.fix}>
                    <IconBtn>{deleteIcon}</IconBtn>
                    <IconBtn>{openIcon}</IconBtn>
                </DropDown>
            </div>
        </div>
    );
};

export default ProjectCard;
