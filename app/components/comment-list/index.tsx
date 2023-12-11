"use client";

import React from 'react';
import { Comment } from '@/app/interfaces/comment';

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <div className="max-w-3xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto flex flex-col gap-4">
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Comments:</h2>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border p-4 rounded-lg shadow-md relative">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600 dark:text-gray-600">
                <span className="flex items-center mr-2">
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <span className="ml-2">{comment.owner.username}</span>
              </div>
              {comment.updatedAt && (
                <div className="text-xs text-gray-500">
                  Updated at: {new Date(comment.updatedAt * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              )}
            </div>
            <div className="text-gray-800 dark:text-gray-700 font-bold text-md">{comment.content}</div>
            <div className="flex items-center text-gray-500 text-sm">
              <span>{new Date(comment.createdAt * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {/* Report button for each comment */}
              <button
                type="button"
                className="ml-2 py-1 px-2 bg-gray-200 text-gray-700 rounded-md hover:bg-red-500 hover:text-white"
              >
                Report
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CommentsList;