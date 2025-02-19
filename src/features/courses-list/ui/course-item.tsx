"use client";

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card'
import { Button } from "@/shared/ui/button"
import React, { useTransition } from 'react'

interface IProps {
    course: CourseListElement
    onDelete: () => Promise<void>
}

const CourseItem = ({ course, onDelete }: IProps) => {
    const [isLoadingDelete, startDeleteTransition] = useTransition();
    const handleDelete = () => {
        startDeleteTransition(async function() {
            await onDelete();
        });
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button
                    disabled={isLoadingDelete}
                    onClick={handleDelete}
                >Удалить</Button>
            </CardFooter>
        </Card>
    )
}

export default CourseItem;
