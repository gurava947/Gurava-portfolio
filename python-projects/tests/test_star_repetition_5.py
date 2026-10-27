import unittest

from support import run_solution


class StarRepetition5Test(unittest.TestCase):
    def test_case_01_gurava_rao(self):
        """Gurava Rao."""
        result = run_solution('star-repetition-5', 'Gurava\nRao')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '***ava\n')

    def test_case_02_python_p(self):
        """Python P."""
        result = run_solution('star-repetition-5', 'Python\nP')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '*ython\n')

    def test_edge_01_last_name_longer_than_first(self):
        """Last name longer than first."""
        result = run_solution('star-repetition-5', 'Al\nReddy')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, '*****\n')

    def test_edge_02_empty_last_name(self):
        """Empty last name."""
        result = run_solution('star-repetition-5', 'Gurava\n\n')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertEqual(result.stdout, 'Gurava\n')


if __name__ == "__main__":
    unittest.main()
