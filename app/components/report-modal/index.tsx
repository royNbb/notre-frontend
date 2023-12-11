"use client";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

export default function ReportModal ({
    isOpen:
})
