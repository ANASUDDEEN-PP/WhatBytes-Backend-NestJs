import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/users.model'; // Adjust the import path if necessary
import { Project } from './project.model'; // Adjust the import path if necessary

export enum TaskStatus {
  TODO = 'TODO', // Task is created but not yet started
  IN_PROGRESS = 'IN_PROGRESS', // Task is being worked on
  DONE = 'DONE', // Task is completed
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string; // Task title

  @Column()
  description: string; // Task description

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO, // Default task status is "TODO"
  })
  status: TaskStatus;

  /**
   * Many-to-One relation between Task and Project.
   * A task belongs to a single project.
   */
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  /**
   * Many-to-One relation between Task and User.
   * A task may be assigned to a single user.
   * This relation is optional (nullable), as not all tasks may have an assigned user initially.
   */
  @ManyToOne(() => User, (user) => user.tasks, { nullable: true })
  assignedUser: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Task creation timestamp
}
