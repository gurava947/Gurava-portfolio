import unittest

from support import run_solution


class AllowedToExamTest(unittest.TestCase):
    def test_case_01_hall_ticket_only(self):
        """Hall ticket only."""
        result = run_solution('allowed-to-exam', 'Y\nN\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Allowed to Exam - Has Hall ticket\n')

    def test_case_02_identification_card_only(self):
        """Identification card only."""
        result = run_solution('allowed-to-exam', 'N\nY\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Allowed to Exam - Has Identification Card\n')

    def test_case_03_neither_document(self):
        """Neither document."""
        result = run_solution('allowed-to-exam', 'N\nN\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Allowed to Exam - Has Identification Card\n')


if __name__ == "__main__":
    unittest.main()
