import React from 'react'

export const osCommands = () => {
    const data = [
        {
            name: 'cd',
            description: 'Change the current working directory & display the current directory'
        },
        {
            name: 'clear',
            description: 'Clear the terminal screen'
        },
        {
            name: 'cp',
            description: 'Copy files or directories to another location'
        },
        {
            name: 'echo',
            description: 'Display a string or variables in the shell'
        },
        {
            name: 'exit',
            description: 'Exit the current shell session'
        },
        {
            name: 'help',
            description: 'Display information about shell commands'
        },
        {
            name: 'ls',
            description: 'List files and directories in the current directory'
        },
        {
            name: 'mkdir',
            description: 'Create a new directory'
        },
        {
            name: 'mv',
            description: 'Move or rename files and directories'
        },
        {
            name: 'rm',
            description: 'Delete files or directories'
        },
        {
            name: 'touch',
            description: 'Create an empty file or update a file’s timestamp'
        },
        {
            name: 'cat',
            description: 'Concatenate and display file contents'
        }
    ];

  return data;
}