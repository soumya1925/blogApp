export type BlogStatus = "draft" | "published";


export interface Blog {
id: string;
title: string;
description: string;
category: string;
author: string;
image?: string;
publishDate: string;
status: BlogStatus;
createdAt: string;
isDeleted: boolean;
deletedAt?: string;
}