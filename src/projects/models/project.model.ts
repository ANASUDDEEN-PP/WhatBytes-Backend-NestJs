import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/users.model'; // Assuming you have a User model
import { ProjectStatus } from '../../projects/models/project-status.enum'; // Assuming you have the enum in a separate file
import { Task } from '../models/task.model'; // Assuming you have a Task model

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.PLANNED,
  })
  status: ProjectStatus;

  /**
   * Many-to-One relation between Project and User.
   * A project is assigned to a single user.
   */
  @ManyToOne(() => User, (user) => user.projects)
  user: User;

  @Column()
  userId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  /**
   * One-to-Many relation between Project and Task.
   * A project can have many tasks.
   */
  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
