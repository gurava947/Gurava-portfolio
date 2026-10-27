import unittest

from support import run_solution


class PermissionToAttemptExamTest(unittest.TestCase):
    def test_case_01_80_and_no_card(self):
        """80% and no card."""
        result = run_solution('permission-to-attempt-exam', '80%\nN\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Allowed to write exam\n')

    def test_case_02_60_and_a_card(self):
        """60% and a card."""
        result = run_solution('permission-to-attempt-exam', '60%\nY\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Allowed to write exam\n')

    def test_case_03_60_and_no_card(self):
        """60% and no card."""
        result = run_solution('permission-to-attempt-exam', '60%\nN\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Cannot write exam\n')


if __name__ == "__main__":
    unittest.main()
